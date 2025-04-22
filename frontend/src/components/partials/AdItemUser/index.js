import React, { useState } from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';
import EditAdModal from '../EditAdModal';

const AdItemUser = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = (updatedAd) => {
        props.onUpdate(updatedAd);
    };

    return (
        <>
            <Item className='aditem'>
                <Link to={`/ad/${props.data.id}`} className='itemLink'>
                    <div className='itemImage'>
                        {props.data.images && props.data.images.length > 0 && (
                            <img src={props.data.images[0].url} alt={props.data.title} />
                        )}
                    </div>
                    <div className='itemName'>
                        {props.data.title}
                    </div>
                    <div className='itemPrice'>
                        {price}
                    </div>
                </Link>
                <button className='editButton' onClick={handleEditClick}>
                    Editar
                </button>
            </Item>
            <EditAdModal
                ad={props.data}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSave}
            />
        </>
    );
}

export default AdItemUser;