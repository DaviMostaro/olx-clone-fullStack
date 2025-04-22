import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageArea, Fake, OthersArea, BreadChumb } from './styled';
import useApi from '../../helpers/OlxApi';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import ImageCarousel from '../../components/ImageCarousel';

const Page = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            console.log('Ad Info:', json); // Verifique o conteúdo de adInfo no console
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, [id]);

    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    return (
        <PageContainer>

            {adInfo.category && 
                <BreadChumb>
                    <span>Você está aqui:</span>
                    <Link to="/" >Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`} >{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`} >{adInfo.category.name}</Link>
                    / {adInfo.title}

                </BreadChumb>
            }

            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                            {loading && <Fake height={300} />}
                            {adInfo.images && Array.isArray(adInfo.images) && adInfo.images.length > 0 ? (
                                <ImageCarousel images={adInfo.images} />
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20} />}
                                {adInfo.title && <h2>{adInfo.title}</h2>}
                                {adInfo.dateCreated && <small>Criado em {formatDate(adInfo.dateCreated)}</small>}
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box box--padding'>
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && (
                            <div className='adInfoBlock'>
                                <div className='adInfoBlockTitle'>Preço Negociável</div>
                            </div>
                        )}
                        {!adInfo.priceNegotiable && adInfo.price && (
                            <div className='price'>
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        )}
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo && (
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className='contactSellerLink'>Fale com o vendedor</a>
                            <div className='createdBy box box--padding'>
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    )}
                </div>
            </PageArea>

            <OthersArea>
                {adInfo.others && (
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className='list'>
                            {adInfo.others.map((i, k) => {
                                console.log('Related Ad:', i); // Verifique o conteúdo de cada anúncio relacionado no console
                                return <AdItem key={k} data={i} />
                            })}
                        </div>
                    </>
                )}
            </OthersArea>
        </PageContainer>
    );
}

export default Page;