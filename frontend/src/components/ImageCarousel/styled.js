import styled from 'styled-components';

export const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    overflow: hidden;
`;

export const CarouselInner = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`;

export const CarouselItem = styled.div`
    min-width: 100%;
    box-sizing: border-box;

    img {
        width: 100%;
        display: block;
    }
`;

export const CarouselControlPrev = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    left: 10px;
`;

export const CarouselControlNext = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    right: 10px;
`;