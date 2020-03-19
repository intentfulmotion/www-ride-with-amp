import React, { useState, useEffect, useCallback } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import Img from 'gatsby-image'

import "./carousel.scss";

export const DotBtn = ({ selected, onInteract, key }) => {
  const onKeyPress = event => {
    let char = event.which || event.keyCode
    if (char === 13 || char === 32)
      onInteract(0)
    else if (char === 37)
      onInteract(-1)
    else if (char === 39)
      onInteract(1)
  }

  return (
    <span
      className={`carousel-dot${selected ? " carousel-dot-active" : ""}`}
      onClick={onInteract(0)}
      onKeyPress={onKeyPress}
      role="option"
      key={key}
    />
  );
}

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
            onInteract={(offset) => scrollTo(index + offset)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

const Carousel = ({ images, videos }) => {
  if (!videos) videos = []

  let imageElements = images.map((image, i) => (
    <div>
      <Img fluid={image.fluid} fadeIn={true} key={i} />
    </div>
  ))

  let videoElements = videos.map((video, i) => (
    <div>
      <video class="carousel-video" autoPlay={true} loop={true} allowFullScreen={true}>
        <source key={`video-${i}`} src={`https:${video.file.url}`} type="video/mp4" />
      </video>
    </div>
  ))

  let elements = videoElements.concat(imageElements)

  return (
    <EmblaCarouselComponent>
      { elements }
    </EmblaCarouselComponent>
  )
}

export default Carousel