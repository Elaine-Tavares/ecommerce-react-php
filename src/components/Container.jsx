import Header from './Header'
import Footer from './Footer'
import styles from './Container.module.css'
import SearchBar from './SearchBar'

export default function Container() {
  return (
    <div className={styles.container}>
        <Header/>
        <SearchBar placeholder="Buscar..." color="#c9a0f5"/>
        <Footer/>
    </div>
  )
}
