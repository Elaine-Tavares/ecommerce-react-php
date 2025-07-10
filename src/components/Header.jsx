import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import styles from './Header.module.css'

import { useState } from 'react'

import { CgCloseR } from "react-icons/cg";
import btnMobile from '../assets/btn_mobile.png'
import { LiaAnkhSolid } from 'react-icons/lia';
import SearchBar from './SearchBar';
import { FaSignInAlt } from "react-icons/fa";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [linkActive, setLinkActive] = useState("/")
   

    const handleMenu = () =>{
     setIsOpen(!isOpen)
     setOverlay(!overlay)
  }

  const isLinkActive = (link) =>{
    setLinkActive(link)
  }

  const criarConta = () => {
    
  }


  return (
    <header >
      <div className={styles.navbar}>
          <Link className={styles.container_logo} to="/">
              <img className={styles.logo} src={logo} alt="Logo do site" />
              <h3>Beleza que revela o seu charme</h3>
          </Link>
          <div className={styles.mobile_menu} onClick={handleMenu}>
            <img className={styles.btn_mobile} src={btnMobile} alt="botaoMobile" />
          </div>
          <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}  onClick={handleMenu}>
            <nav className={`${styles.nav_links} ${isOpen ? styles.open : ""}`}>
              <h1 className={styles.mobile_close} onClick={handleMenu}>X</h1>
              <Link 
                onClick={() =>isLinkActive("/")} 
                className={`${styles.link} ${linkActive === "/" ? styles.active : ""}`} 
                to="/">Home
              </Link>
              <Link 
                onClick={() =>isLinkActive("/produtos")} 
                className={`${styles.link} ${linkActive === "/produtos" ? styles.active : ""}`}  
                to="/produtos">Produtos
              </Link>
              <Link 
                onClick={() =>isLinkActive("/vantagens")} 
                className={`${styles.link} ${linkActive === "/vantagens" ? styles.active : ""}`} 
                to="/vantagens">Vantagens
              </Link>
              <Link 
                onClick={() => {
                  isLinkActive("/criarConta");
                  criarConta("/criarConta")
                }}
                
                className={`${styles.link} ${linkActive === "/criarConta" ? styles.active : ""}`}  
                to="/criarConta">Criar Conta
              </Link>
              <Link 
                onClick={() =>isLinkActive("/entrar")} 
                className={`${styles.link_entrar} ${linkActive === "/entrar" ? styles.active : ""}`} 
                to="/entrar">Entrar<FaSignInAlt />
              </Link>
            </nav> 
          </div>   
      </div>
      
    </header>
  )
}
