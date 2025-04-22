import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ImageContainer, ImageItem, DeleteButton } from './styled';
import useApi from '../../../helpers/OlxApi'; 

const EditAdModal = ({ ad, isOpen, onClose, onSave }) => {
    const api = useApi();
    const [title, setTitle] = useState(ad.title);
    const [price, setPrice] = useState(ad.price);
    const [description, setDescription] = useState(ad.description);
    const [images, setImages] = useState(ad.images);
    const [status, setStatus] = useState(ad.status); 

    useEffect(() => {
        setTitle(ad.title);
        setPrice(ad.price);
        setDescription(ad.description);
        setImages(ad.images);
        setStatus(ad.status); 
    }, [ad]);

    const handleSave = async () => {
        const fData = new FormData();
        fData.append('title', title);
        fData.append('price', price);
        fData.append('description', description);
        fData.append('status', status === false ? 'false' : 'true'); 
        fData.append('images', JSON.stringify(images.filter(image => !image.file).map((image, index) => ({ url: image.url, default: index === 0 })))); 
    
        images.forEach((image, index) => {
            if (image.file) {
                fData.append('img', image.file); 
            }
        });
    
      
        const token = localStorage.getItem('token'); 
        if (token) {
            fData.append('token', token);
        }
    
 
       
    

    
        const json = await api.updateAd(ad.id, fData); // Ajuste para ad.id
        if (json.error) {
            alert(json.error);
        } else {
            onSave({ ...ad, title, price, description, status: json.ad.status === 'false' ? false : json.ad.status, images: json.ad.images });
            onClose();
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            file
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <h2>Editar Anúncio</h2>
                    <button onClick={onClose}>X</button>
                </ModalHeader>
                <ModalBody>
                    <label>
                        Título:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Preço:
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        Descrição:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Status:
                        <select value={status} onChange={(e) => setStatus(e.target.value === 'true')}>
                            <option value="true">Ativar</option>
                            <option value="false">Desativar</option>
                        </select>
                    </label>
                    <label>
                        Imagens:
                        <input type="file" multiple onChange={handleAddImage} />
                    </label>
                    <ImageContainer>
                        {images.map((image, index) => (
                            <ImageItem key={index}>
                                <img src={image.url} alt={`Imagem ${index + 1}`} />
                                <DeleteButton onClick={() => handleDeleteImage(index)}>Deletar</DeleteButton>
                            </ImageItem>
                        ))}
                    </ImageContainer>
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={onClose}>Cancelar</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditAdModal;