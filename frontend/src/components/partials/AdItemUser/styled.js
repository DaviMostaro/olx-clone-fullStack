import styled from 'styled-components';

export const Item = styled.div`
    position: relative;
    .itemLink {
        display: block;
        text-decoration: none;
        color: #000;
    }
    .itemImage img {
        width: 100%;
        border-radius: 5px;
    }
    .itemName {
        font-weight: bold;
    }
    .itemPrice {
        color: #00f;
    }
    .editButton {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        display: none;
    }
    &:hover .editButton {
        display: block;
    }

    @media (max-width: 600px) {
        .editButton {
            display: block !important; // Adicionando !important para garantir que o botão seja exibido
        }
    }
`;