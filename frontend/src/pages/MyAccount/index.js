import React, { useState, useEffect } from 'react';
import { PageArea, AdsPageArea } from './styled';
import useApi from '../../helpers/OlxApi';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import AdItemUser from '../../components/partials/AdItemUser';

const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [stateList, setStateList] = useState([]);
    const [stateLoc, setStateLoc] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userAds, setUserAds] = useState([]);

    const getUserAds = async () => {
        const list = await api.getUserAds();
        setUserAds(Array.isArray(list.ads) ? list.ads : []);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
    
        if (password !== confirmPassword) {
            setError('As senhas não conferem');
            setDisabled(false);
            return;
        }
    
        const json = await api.updateUser({ name, email, password, state: stateLoc });
    
        console.log('json.error:', json.error); 
    
        if (json.error) {
            setError(typeof json.error === 'string' ? json.error : 'Erro desconhecido');
        } else {
            window.location.href = '/my-account';
        }
    
        setDisabled(false);
    };

    const handleUpdateAd = (updatedAd) => {
        setUserAds(userAds.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
    }

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        getUserAds();
    }, []);

    return (
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='area--title'>Nome</div>
                        <div className='area--input'>
                            <input placeholder='Digite seu novo nome' type='text' disabled={disabled} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>E-mail</div>
                        <div className='area--input'>
                            <input placeholder='Novo E-mail' type='email' disabled={disabled} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'> Estado </div>
                        <div className='area--input'>
                            <select value={stateLoc} onChange={e => setStateLoc(e.target.value)}>
                                <option></option>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title' >Senha</div>
                        <div className='area--input'>
                            <input placeholder='Nova senha' type='password' disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Confirmar Senha</div>
                        <div className='area--input'>
                            <input placeholder='Confirme a senha' type='password' disabled={disabled} value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disabled}>Atualizar conta</button>
                        </div>
                    </label>
                </form>
            </PageArea>

            <PageTitle>Meus Anúncios</PageTitle>
            <AdsPageArea>
                <div className='list'>
                    {userAds.map((i, k) => (
                        <AdItemUser key={k} data={i} onUpdate={handleUpdateAd} />
                    ))}
                </div>
            </AdsPageArea>
        </PageContainer>
    );
}

export default Page;
