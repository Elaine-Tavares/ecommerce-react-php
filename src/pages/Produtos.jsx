import Container from '../components/Container'
import styles from  './Produtos.module.css'

import api from '../services/api'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'

export default function Produtos() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [imgs, setImgs] = useState([])
    const [valorDoUsuario, setValorDoUsuario] = useState('')
    const [carregando, setCarregando] = useState(false)

    const searchObjects = async () => {   
        setCarregando(true)
        try {
          const response = await api.get('/elaines_charm_backend/produtos.php')
          // sucesso 
          if (response.status) {
            //exibe a mensagem de sucesso
            setImgs(response.data.dados)
            setCarregando(false)
            return;
          
            } else {
             console.error("Erro ao carregar imagens", response.status)    
              return;
          }
        } catch (error) {
          console.error("Erro ao carregar imagens, catch", error)
          return;
        } 
      }
    
      useEffect(() => {
        searchObjects()
      }, [valorDoUsuario])
      
    
        // Novo array com filtro aplicado
        const produtosFiltrados = imgs.filter((img) =>
         img.nome_do_produto.toLowerCase().includes(valorDoUsuario.toLowerCase())    
      )

      

  return (
      <Container >
        <SearchBar
          inputDoUsuario={valorDoUsuario}
          setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}   
        />
        {carregando && <div className='loader'></div>}

        <h1 className={styles.titulo}>Nossos Produtos</h1>
         {valorDoUsuario && produtosFiltrados.length === 0 && (
            <p className={styles.semResultados}>Nenhum produto encontrado com esse nome 😢</p>
        )}
        <div className={styles.produtosContainer}> 
          {produtosFiltrados.map((img) => 
            <div key={img.id_do_produto} name={img.categoria_do_produto} className={styles.cardProduto}>
              <img src={img.imagem_do_produto} alt="Produto" />
              <h2>{img.nome_do_produto}</h2>
              <p className={styles.preco}> R$ {Number(img.valor_do_produto).toFixed(2)}</p>
              <p className={styles.preco}>{img.parcelamento_do_produto}</p>
              <Link  to={`/produto_detalhes/${img.id_do_produto}`} className={styles.cardLink}> <button className={styles.botaoComprar}>Ver Produto</button></Link>
            </div> 
          )} 
       </div>
      </Container>
)
}