import styles from './SearchBar.module.css'
import { BsSearchHeart } from "react-icons/bs";

export default function SearchBar({placeholder, color}) {
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
