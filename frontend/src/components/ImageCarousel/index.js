import React, { useState, useEffect } from 'react';
import { CarouselContainer, CarouselInner, CarouselItem, CarouselControlPrev, CarouselControlNext } from './styled';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 3000); // Muda a imagem a cada 3 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, [currentIndex]);

    return (
        <CarouselContainer>
            <CarouselInner style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, index) => (
                    <CarouselItem key={index}>
                        <img src={img.url} alt="" />
                    </CarouselItem>
                ))}
            </CarouselInner>
            <CarouselControlPrev onClick={goToPrevious}>
                &#10094;
            </CarouselControlPrev>
            <CarouselControlNext onClick={goToNext}>
                &#10095;
            </CarouselControlNext>
        </CarouselContainer>
    );
};

export default ImageCarousel;