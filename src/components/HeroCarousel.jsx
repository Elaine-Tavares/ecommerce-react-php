// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './HeroCarousel.module.css'

// import api from '../services/api'

import hero_img1 from '../assets/hero_img1.png'
import hero_img2 from '../assets/hero_img2.png'
import hero_img3 from '../assets/hero_img3.jpg'
import hero_img4 from '../assets/hero_img4.jpg'
import hero_img5 from '../assets/hero_img5.jpg'
import hero_kit_cuidados from '../assets/hero_kit_cuidados.jpg'
import hero_maquiagem from '../assets/hero_maquiagem.jpg'

import { useEffect, useState } from 'react'

export default function HeroCarousel() {
  const [imgs, setImgs] = useState([])

  
  
  const searchImgs = () =>{   
    setImgs(objetos)
  }

  useEffect(() => {
    searchImgs() 
  },)

  return (
    <div className={styles.swiperContainer} >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className={styles.mySwiper}
      >  
        <SwiperSlide className={styles.banner_principal}>
          <img src={hero_img1}alt="Banner" />  
          <h2>Descubra o charme que há em você!</h2>
        </SwiperSlide> 
        {imgs.map((img) => 
        <SwiperSlide 
          key={img.id}>
          <img src={img.imagem} 
          alt="Banner" 
        />
        </SwiperSlide>  
       )}
      </Swiper>
    </div>
  )
}
