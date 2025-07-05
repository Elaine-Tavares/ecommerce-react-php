import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import styles from './Header.module.css'

import { useState } from 'react'

import { CgCloseR } from "react-icons/cg";
import btnMobile from '../assets/btn_mobile.png'


export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [overlay, setOverlay] = useState(false)

    const handleMenu = () =>{
     setIsOpen(!isOpen)
     setOverlay(!overlay)
  }

  return (
   <header className={styles.navbar}>
        <Link to="/">
             <img className={styles.logo} src={logo} alt="Carrinho de Compras" />
        </Link>
        <div className={styles.mobile_menu} onClick={handleMenu}>
          <img className={styles.btn_mobile} src={btnMobile} alt="botaoMobile" />
        </div>
        <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}  onClick={handleMenu}>
            <nav className={`${styles.nav_links} ${isOpen ? styles.open : ""}`}>
                <CgCloseR className={styles.mobile_close} onClick={handleMenu}/>
                <Link className={styles.link} to="/">Home</Link>
                <Link className={styles.link} to="/Produtos">Produtos</Link>
                <Link className={styles.link} to="/Vantagens">Vantagens</Link>
            </nav> 
        </div>
         
    </header>
  )
}
