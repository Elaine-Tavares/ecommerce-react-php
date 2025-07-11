import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { FaLinkedin } from "react-icons/fa6";


export default function Footer() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  return (
//     Termos de uso

// Política de privacidade

// Contato

// Redes sociais (se quiser simular ícones de Insta/Facebook)

    <footer className={styles.footer}>
      <p>Desenvolvido por <strong>Elaine Tavares</strong></p>
      <div style={{display: "flex", justifyContent: "center"}}>
          <Link to="/termos">Termos de Uso</Link> &nbsp;&nbsp; e &nbsp;&nbsp;
          <Link to="/politica">Política de Privacidade</Link>.
      </div>
      <p>Email: <a href="mailto:elainetavares.developer@gmail.com">elainetavares.developer@gmailcom</a></p>
      <p>WhatsApp: <a href="https://wa.me/5521998410746" target="_blank">(21) 99841-0746</a></p>
      <p className={styles.icone_linkedin}>Linkedin: <a href="https://www.linkedin.com/in/elaine-tavares-b5797b1b0/" target="_blank">{<FaLinkedin/>}</a></p>
    </footer>
  )
}
