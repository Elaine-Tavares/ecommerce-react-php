import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import HeroCarousel from '../components/HeroCarousel'
import selo from '../assets/selo.webp'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import api from '../services/api.js'



export default function Home() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguid_do_produtoa: as funções internas
    4 - Por fim: o retorno do JSX*/
 
     const [imgs, setImgs] = useState([])
     const [valorDoUsuario, setValorDoUsuario] = useState("")
       const [ativado, setAtivado] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const location = useLocation()
    const navigate = useNavigate()

      useEffect(() => {
      const params = new URLSearchParams(location.search)
      if (params.get('sucesso') === '1') {
        setMensagem('Conta ativada com sucesso! Clique no botão abaixo para logar.')
        setAtivado(true) // ← agora o estado foi alterado

        // Limpa a mensagem depois de 5 segundos (opcional)
        setTimeout(() => setMensagem(''), 5000)
      }
    }, [location])
    
     const searchObjects = async () => {   

    try {
      const response = await api.get('/elaines_charm_backend/produtos.php')
      // sucesso 
      if (response.status) {
        //exibe a mensagem de sucesso
        setImgs(response.data.dados)
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
    <Container>
    <SearchBar
      inputDoUsuario={valorDoUsuario}
      setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}
    />
     {mensagem}
        {ativado && (
          <button className={styles.botaoLogar} onClick={() => navigate('/entrar')}>Logar</button>
        )}
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
          A Elaine’s Charm nasceu do amor pelos cuid_do_produtoados com a pele e a autoestima. 
          Oferecemos cosméticos de alta qualid_do_produtoade, cruelty-free e com preços justos.
        </p>
      </section>

      {/* Destaques de produtos ou categorias */}
      <section className={styles.highlights}>
        <h2>Conheça nossos destaques</h2>
        <div className={styles.cardsContainer}>
          {imgs.slice(0, 3).map((img) => 
            <div className={styles.card}>
            <img src={img.imagem_do_produto} alt="Produto" />
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
        <p>Produtos livres de crueldade animal. Amor à beleza e à vid_do_produtoa. 🐇</p>
      </section>

      {/* Chamada para criar conta */}
      <section className={styles.cta}>
        <h2>💌 Quer ofertas exclusivas?</h2>
        <p>Crie sua conta grátis e receba novid_do_produtoades direto no seu e-mail</p>
        <div className={styles.ctaButtons}>
          <Link to="/criarConta" className={styles.btnPrimary}>Criar Conta</Link>
          <Link to="/entrar" className={styles.btnSecondary}>Entrar</Link>
        </div>
      </section>
    </div>
    </Container>
  )
}
