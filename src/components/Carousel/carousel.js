import React, { useState, useEffect, useCallback } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import "./carousel.css";
import Img from 'gatsby-image'

export const DotBtn = ({ selected, onClick }) => (
  <span
    className={`carousel-dot${selected ? " carousel-dot-active" : ""}`}
    onClick={onClick}
  />
);

const EmblaCarouselComponent = ({ children }) => {
  const [carousel, initCarousel] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback(index => carousel.scrollTo(index), [carousel])

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(carousel.selectedScrollSnap());
    };
    if (carousel) {
      setScrollSnaps(carousel.scrollSnapList());
      carousel.on("select", onSelect);
      onSelect()
    }
    return () => carousel && carousel.destroy();
  }, [carousel])

  return (
    <div className="carousel">
      <div className="carousel__wrap">
        <EmblaCarouselReact
          className="carousel__viewport"
          emblaRef={initCarousel}
          options={{ loop: true }}
          htmlTagName="div"
        >
          <div className="carousel__container">
            {children.map((Child, index) => (
              <div className="carousel__item" key={index}>
                {Child}
              </div>
            ))}
          </div>
        </EmblaCarouselReact>
      </div>
      <div className="carousel__dots">
        {scrollSnaps.map((snap, index) => (
          <DotBtn
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

const Carousel = ({ images }) => (
  <EmblaCarouselComponent>
    {images.map((image, i) => (
      <div>
        <Img fluid={image.fluid} fadeIn={true} key={i} />
      </div>
    ))}
  </EmblaCarouselComponent>
)

export default Carousel