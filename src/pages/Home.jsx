import { Link } from 'react-router-dom'
import Container from '../components/Container'
import styles from './Home.module.css'
import HeroCarousel from '../components/HeroCarousel'
import selo from '../assets/selo.png'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import api from '../services/api'


export default function Home() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [imgs, setImgs] = useState([])
    const [msg, setMsg] = useState()
    const [valorDoUsuario, setValorDoUsuario] = useState('')
    const [carregando, setCarregando] = useState(false)

    const searchImgs = async () => {
      try {
        setCarregando(true)
        const response = await api.get('/produtos.php'); {
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
    
      } finally {
      setCarregando(false)
    }
  };

    // Novo array com filtro aplicado
    const produtosFiltrados = imgs.filter((img) =>
     img.nome_do_produto.toLowerCase().includes(valorDoUsuario.toLowerCase())    
  )

  useEffect(() => {
      searchImgs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    
  return (
    <Container>
    <SearchBar
      inputDoUsuario={valorDoUsuario}
      setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}
    />
    {carregando && <div className='loader'></div>}
    {valorDoUsuario && (
      <div className={styles.produtosContainer}>
        <h1 className={styles.titulo}>Nossos Produtos</h1>
            {valorDoUsuario && produtosFiltrados.length === 0 && (
            <p className={styles.semResultados}>Nenhum produto encontrado com esse nome 😢</p>
        )}
        {produtosFiltrados.map((produto) => (
        <div
            key={produto.id_do_produto}
            name={produto.categoria_do_produto}
            className={styles.cardProduto}
          >
          <img src={produto.imagem_do_produto} alt="Produto" />
          <h2>{produto.nome_do_produto}</h2>
          <p className={styles.preco}>
            R$ {Number(produto.valor_do_produto).toFixed(2)}
          </p>
          <p className={styles.preco}>{produto.parcelamento_do_produto}</p>
          <Link  to={`/produto_detalhes/${produto.id_do_produto}`} className={styles.cardLink}> <button className={styles.botaoVer}>Ver Produto</button></Link>
        </div>
    ))}
  </div>
)}

    <div className={styles.homeContainer}>
      {/* Hero */}
      <HeroCarousel/>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Beleza com propósito</h1>
          <p>Cosméticos que revelam o seu charme natural</p>
          <Link to="/produtos" className={styles.btnHero}>Ver Produtos</Link>
        </div>
      </section>
      {/* Benefícios */}
      <section className={styles.benefits}>
        <div className={styles.benefitCard}>
          <h3>🚚 Frete Grátis</h3>
          <p>Para compras acima de R$99</p>
        </div>
        <div className={styles.benefitCard}>
          <h3>💳 Parcelamento</h3>
          <p>Em até 6x sem juros</p>
        </div>
        <div className={styles.benefitCard}>
          <h3>🌿 Testado e seguro</h3>
          <p>Produtos dermatologicamente testados</p>
        </div>
      </section>

      {/* Sobre */}
      <section className={styles.about}>
        <h2>Sobre a Elaine’s Charm</h2>
        <p>
          A Elaine’s Charm nasceu do amor pelos cuidados com a pele e a autoestima. 
          Oferecemos cosméticos de alta qualidade, cruelty-free e com preços justos.
        </p>
      </section>

      {/* Destaques de produtos ou categorias */}
      <section className={styles.highlights}>
        <h2>Conheça nossos destaques</h2>
        <div className={styles.cardsContainer}>
          {imgs.slice(0, 3).map((img) => 
            <div className={styles.card}>
            <img src={img.imagem_do_produto} alt="Produto 1" />
            <h4>{img.nome_do_produto}</h4>
            <Link  to={`/produto_detalhes/${img.id_do_produto}`} className={styles.cardLink}><button className={styles.botaoVer}>Ver Produto</button></Link>
          </div>
          )}
        </div>
      </section>

      <section className={styles.crueltyFreeSection}>
        <img 
          src={selo} 
          alt="Produto Cruelty-Free"
          className={styles.crueltyIcon}
        />
        <p>Produtos livres de crueldade animal. Amor à beleza e à vida. 🐇</p>
      </section>

      {/* Chamada para criar conta */}
      <section className={styles.cta}>
        <h2>💌 Quer ofertas exclusivas?</h2>
        <p>Crie sua conta grátis e receba novidades direto no seu e-mail</p>
        <div className={styles.ctaButtons}>
          <Link to="/criarConta" className={styles.btnPrimary}>Criar Conta</Link>
          <Link to="/entrar" className={styles.btnSecondary}>Entrar</Link>
        </div>
      </section>
    </div>
    </Container>
  )
}
