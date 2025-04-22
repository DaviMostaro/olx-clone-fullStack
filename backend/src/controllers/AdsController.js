const { v4: uuidv4 } = require('uuid');
const Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

const Category = require('../models/Category');
const User = require('../models/User');
const Ad = require('../models/Ad');
const StateModel = require('../models/State');

const mediaDir = path.join(__dirname, '../../public/media');
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
}

const addImage = async (buffer) => {
    let newName = `${uuidv4()}.jpg`;
    let tmpImg = await Jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`${mediaDir}/${newName}`);
    return `${process.env.BASE}/media/${newName}`;
}

module.exports = {
    getCategories: async (req, res) => {
        const cats = await Category.find({});

        let categories = [];

        for (let i in cats) {
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        res.json({categories})
    },
    addAction: async (req, res) => {
        let { title, price, priceneg, desc, cat, token } = req.body;
        const user = await User.findOne({token}).exec();

        if(!title || !cat) {
            res.json({error: "título e categoria são obrigatórios"});
            return;
        }

        if(cat.length < 12) {
            res.json({error: "categoria inválida"});
            return;
        }

        const category = await Category.findById(cat);
        if(!category) {
            res.json({error: "categoria inválida"});
            return;
        }

        if(price) {
            price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
            price = parseFloat(price);
        } else {
            price = 0;
        }

        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreated = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;
        newAd.images = []; // Inicialize como um array

        if(req.files && req.files.img) {
            if(req.files.img.length == undefined) {
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data);
                    newAd.images.push({
                        url,
                        default: false
                    });
                }
            } else {
                for(let i = 0; i < req.files.img.length; i++) {
                    if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data);
                        newAd.images.push({
                            url,
                            default: false
                        });
                    }
                }
            }
        }

        if(newAd.images.length > 0) {
            newAd.images[0].default = true;
        }

        const info = await newAd.save();
        res.json({id: info._id});
    },
    getList: async (req, res) => {
        let { sort = 'asc', offset = 0, limit = 8, q, cat, state } = req.query;
        let filters = {status: true}
        let total = 0;

        if(q) {
            filters.title = {'$regex': q, '$options': 'i'};
        }

        if(cat) {
            const c = await Category.findOne({slug: cat}).exec();
            if(c) {
                filters.category = c._id.toString();
            }
        }

        if(state) {
            const s = await StateModel.findOne({name: state.toUpperCase()}).exec();
            if(s) {
                filters.state = s._id.toString();
            }
        }

        const adsTotal = await Ad.find(filters).exec();
        total = adsTotal.length;


        const adsData = await Ad.find(filters)
            .sort({dateCreated: (sort == 'desc') ? -1 : 1})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec();
        let ads = [];
        for (let i in adsData) {
            let image;

            let defaultImg = adsData[i].images.find(e => e.default);
            if(defaultImg) {
                image = `${defaultImg.url}`;
            } else {
                image = `${process.env.BASE}/media/default.jpg`
            }

            ads.push({
                id: adsData[i]._id,
                status: adsData[i].status,
                image: adsData[i].images[0].url,
                dateCreated: adsData[i].dateCreated,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceNegotiable,
                description: adsData[i].description,
                views: adsData[i].views,
                category: adsData[i].category
            });
        }

        res.json({ads, total});
    },
    
       
        getItem: async (req, res) => {
            let {id, other = null} = req.query;
    
            if(!id) {
                res.json({error: 'Ad not found'});
                return;
            }
    
            if(id.length < 12) {
                res.json({error: 'ID inválido'});
                return;
            }
    
            const ad = await Ad.findById(id);
            if(!ad) {
                res.json({error: 'Produto inexistente'});
                return;
            }
    
            ad.views++;
            await ad.save();
    
            let images = [];
            for(let i in ad.images) {
                images.push({
                    url: ad.images[i].url,
                    default: ad.images[i].default
                });
            }
    
            let category = await Category.findById(ad.category).exec();
            let userInfo = await User.findById(ad.idUser).exec();
            let stateInfo = await StateModel.findById(ad.state).exec();
    
            let others = [];
            if(other) {
                const otherData = await Ad.find({idUser: ad.idUser, status: true}).exec();
    
                for(let i in otherData) {
                    if(otherData[i]._id.toString() != ad._id.toString()) {
                        let image = `${process.env.BASE}/media/default.jpg`;
    
                        let defaultImg = otherData[i].images.find(e => e.default);
                        if(defaultImg) {
                            image = `${defaultImg.url}`;
                        }
    
                        others.push({
                            id: otherData[i]._id,
                            title: otherData[i].title,
                            price: otherData[i].price,
                            priceNegotiable: otherData[i].priceNegotiable,
                            image
                        });
                    }
                }
            }
    
            res.json({
                id: ad._id,
                images,
                dateCreated: ad.dateCreated,
                title: ad.title,
                price: ad.price,
                priceNegotiable: ad.priceNegotiable,
                description: ad.description,
                views: ad.views,
                category,
                userInfo: {
                    name: userInfo.name,
                    email: userInfo.email
                },
                stateName: stateInfo.name,
                others
            });
        },

        // Backend: editAction
    editAction: async (req, res) => {
        let { id } = req.params;
        let { title, status, price, priceneg, desc, cat, token, images } = req.body;

        console.log('Ad ID:', id); // Adicione este log para verificar o ID do anúncio
        console.log('Status recebido:', status); // Adicione este log para verificar o status recebido

        if (id.length < 12) {
            res.json({ error: 'ID inválido' });
            return;
        }

        const ad = await Ad.findById(id).exec();

        if (!ad) {
            res.json({ error: 'Produto inexistente' });
            return;
        }

        const user = await User.findOne({ token }).exec();
        if (user._id.toString() !== ad.idUser) {
            res.json({ error: 'Acesso negado' });
            return;
        }

        let updates = {};

        if (title) {
            updates.title = title;
        }

        if (price) {
            price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
            price = parseFloat(price);
            updates.price = price;
        }

        if (priceneg) {
            updates.priceNegotiable = (priceneg == 'true') ? true : false;
        }

        if (status !== undefined) {
            console.log('Status recebido:', status); // Adicione este log para verificar o status recebido
            updates.status = status === 'false' ? false : true;
        }

        if (desc) {
            updates.description = desc;
        }

        if (cat) {
            const category = await Category.findOne({ slug: cat }).exec();
            if (!category) {
                res.json({ error: 'Categoria inválida' });
                return;
            }
            updates.category = category._id.toString();
        }

        if (images) {
            updates.images = JSON.parse(images);
        }

        if (req.files && req.files.img) {
            let newImages = [];

            // Se houver apenas uma imagem
            if (req.files.img.length == undefined) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data);
                    newImages.push({
                        url,
                        default: false
                    });
                }
            } else {
                // Se houver múltiplas imagens
                for (let i = 0; i < req.files.img.length; i++) {
                    if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data);
                        newImages.push({
                            url,
                            default: false
                        });
                    }
                }
            }

            // Adicione as novas imagens ao array de imagens do anúncio
            updates.images = [...updates.images, ...newImages];
        }

        // Verifique se há uma imagem padrão, caso contrário, defina a primeira imagem como padrão
        if (updates.images && updates.images.length > 0) {
            const hasDefault = updates.images.some(image => image.default);
            if (!hasDefault) {
                updates.images[0].default = true;
            }
        }

        await Ad.updateOne({ _id: id }, { $set: updates }).exec();

        const updatedAd = await Ad.findById(id).exec();

        console.log('Updated Ad:', updatedAd); // Adicione este log para verificar o objeto atualizado

        res.json({ error: '', ad: updatedAd });
    },
};