import { Link } from 'react-router-dom'
import Container from '../components/Container'
import styles from './Home.module.css'


export default function Home() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    
  return (
    <Container>
    <div className={styles.homeContainer}>
      {/* Hero */}
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
          <div className={styles.card}>
            <img src="https://via.placeholder.com/200x200" alt="Produto 1" />
            <h4>Batom Vegano</h4>
            <Link to="/produtos">Ver</Link>
          </div>
          <div className={styles.card}>
            <img src="https://via.placeholder.com/200x200" alt="Produto 2" />
            <h4>Kit Cuidados</h4>
            <Link to="/produtos">Ver</Link>
          </div>
          <div className={styles.card}>
            <img src="https://via.placeholder.com/200x200" alt="Produto 3" />
            <h4>Base Leve</h4>
            <Link to="/produtos">Ver</Link>
          </div>
        </div>
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
