import React from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';

export default (props) => {
    let price = '';

    if (props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    console.log('AdItem props:', props); // Verifique as props no console

    return (
        <Item className='aditem'>
            <Link to={`/ad/${props.data.id}`} className='itemLink'>
                <div className='itemImage'>
                    {/* {props.data.images && 
                        <img src={props.data.images} alt={props.data.title} />
                    } */}
                    {props.data.image && (
                        <img src={props.data.image} alt={props.data.title} />
                    )}
                </div>
                <div className='itemName'>
                    {props.data.title}
                </div>
                <div className='itemPrice'>
                    {price}
                </div>
            </Link>
        </Item>
    );
}