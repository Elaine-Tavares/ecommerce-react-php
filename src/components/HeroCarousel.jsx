// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import hero_img1 from '../assets/hero_banner.1.webp'
import api from '../services/api.js'
import styles from './HeroCarousel.module.css'

import { useEffect, useState } from 'react'

export default function HeroCarousel() {
  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(false)

  const carregarCarousel = async () => {   
      setLoading(true)
    try {
      const response = await api.get('/elaines_charm_backend/hero_carousel.php')
      // sucesso 
      if (response.status) {
        //exibe a mensagem de sucesso
        setImgs(response.data.dados)
        setLoading(false)
        return;
      
        } else {
          console.error("Erro ao carregar imagens", response.data.status)  
          return;
      }
    } catch (error) {
      console.error("Erro ao carregar imagens, catch", error)
      return;
    } 
  }


  useEffect(() => {
    carregarCarousel()
  }, [])
  
  

  return (
    <div className={styles.swiperContainer} >
      {loading}
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
          <img src={img.link_destino} 
          alt="Banner" 
        />
        </SwiperSlide>  
       )}
      </Swiper>
    </div>
  )
}
