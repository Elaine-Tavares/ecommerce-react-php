// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './HeroCarousel.module.css'

import api from '../services/api'

import hero_img1 from '../assets/hero_img1.png'

import { useEffect, useState } from 'react'

export default function HeroCarousel() {
  const [imgs, setImgs] = useState([])
  const [msg, setMsg] = useState()


  const searchImgs = async () => {
      try {
        const response = await api.get('/hero_carousel.php'); {
          if(response.data.status === 'sucesso'){
            setImgs(response.data.dados);
            console.log(msg)
            // console.log("STATUS", response.data.status)
            // console.log("Imagens carregadas:", response.data.dados);
          }
        }
         
      } catch (error) {
        console.error("Erro:", error);
        setMsg("Erro ao conectar com o servidor.")
        return;
      }
  };

  useEffect(() => {
    searchImgs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className={styles.mySwiper}
      >  
        <SwiperSlide className={styles.banner_principal}>
          <img src={hero_img1}alt="Banner 2" />  
          <h2>Descubra o charme que há em você!</h2>
        </SwiperSlide> 
        {imgs.map((img) => 
        <SwiperSlide key={img.id}><img src={`http://localhost/elaines_charm_backend/images/${img.imagem}`}alt="Banner 2" /></SwiperSlide>  
       )}
      </Swiper>
    </div>
  )
}
