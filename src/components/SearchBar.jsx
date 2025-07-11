import styles from './SearchBar.module.css'
import { BsSearchHeart } from "react-icons/bs";

export default function SearchBar({placeholder, color}) {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
  return (
    <div 
        className={styles.search_bar}>
        <input type="text" placeholder={placeholder} />
        <div style={{background:`${color}`}} className={styles.container_lupa}>
            <BsSearchHeart className={styles.lupa} />
        </div>   
    </div>
  )
}
