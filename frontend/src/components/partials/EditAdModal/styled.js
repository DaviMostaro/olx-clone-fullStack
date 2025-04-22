import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 100%;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

export const ModalBody = styled.div`
    label {
        display: block;
        margin-bottom: 10px;
    }
    input, textarea, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        margin-left: 10px;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

export const ImageItem = styled.div`
    position: relative;
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 5px;
    }
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 0, 0, 0.7);
    color: #fff;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    display: none;
    ${ImageItem}:hover & {
        display: block;
    }
`;