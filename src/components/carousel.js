import React, { useState, useEffect } from 'react'
import EmblaCarouselReact from 'embla-carousel-react'
import Img from 'gatsby-image'

const Carousel = ({ images }) => {
  const [embla, setEmbla] = useState(null)

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`)
      })
    }
  }, [embla])

  return (
    <>
      <EmblaCarouselReact
        emblaRef={setEmbla}
        options={{ loop: true }}
      >
        <div style={{ display: 'flex' }}>
          {
            images.map(img => (
              <div style={{ flex: '0 0 100%' }}><Img fluid={img.fluid} /></div>
            ))
          }
        </div>
      </EmblaCarouselReact>
      <button onClick={() => embla.scrollPrev()}>Prev</button>
      <button onClick={() => embla.scrollNext()}>Next</button>
    </>
  )
}

export default Carousel