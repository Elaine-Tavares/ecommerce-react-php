import { useEffect, useState } from 'react'
import Container from '../components/Container'
import styles from './MeuCarrinho.module.css'

export default function MeuCarrinho() {
  const [produtos, setProdutos] = useState([])
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState(null)
  const [erroCep, setErroCep] = useState(null)

  // Carrega o carrinho do localStorage ao abrir a página
  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || []

    // Se não tiver quantidade, define como 1
    const carrinhoComQuantidade = carrinhoSalvo.map((p) =>
      p.quantidade ? p : { ...p, quantidade: 1 }
    )

    setProdutos(carrinhoComQuantidade)
  }, [])

  // Atualiza estado e localStorage ao modificar o carrinho
  const atualizarCarrinho = (novoCarrinho) => {
    setProdutos(novoCarrinho)
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
  }

  // Aumenta a quantidade do produto
  const adicionar = (id) => {
    const atualizado = produtos.map((p) =>
      p.id_do_produto === id ? { ...p, quantidade: p.quantidade + 1 } : p
    )
    atualizarCarrinho(atualizado)
  }

  // Diminui a quantidade do produto
  const remover = (id) => {
    const atualizado = produtos
      .map((p) =>
        p.id_do_produto === id
          ? { ...p, quantidade: p.quantidade - 1 }
          : p
      )
      .filter((p) => p.quantidade > 0) // remove se a quantidade ficar 0
    atualizarCarrinho(atualizado)
  }

  // Soma o valor total dos produtos com base na quantidade
  const calcularSubtotal = () => {
    return produtos.reduce(
      (total, p) => total + parseFloat(p.valor_do_produto) * p.quantidade,
      0
    )
  }

  const calcularTotal = () => {
    const subtotal = calcularSubtotal()
    return frete ? (subtotal + frete).toFixed(2) : subtotal.toFixed(2)
  }

  const calcularFrete = async () => {
    if (cep.length !== 8) {
      setErroCep('Digite um CEP válido com 8 números.')
      setFrete(null)
      return
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setErroCep('CEP não encontrado.')
        setFrete(null)
        return
      }

      setErroCep(null)

      let valorFrete = 0
      if (data.uf === 'SP') valorFrete = 10.90
      else if (data.uf === 'RJ') valorFrete = 14.50
      else valorFrete = 19.99

      setFrete(valorFrete)
    } catch (err) {
      setErroCep('Erro ao consultar o CEP.', err)
      setFrete(null)
    }
  }

  return (
    <Container>
      <div className={styles.container}>
        <h1>Meu Carrinho</h1>

        {produtos.length === 0 ? (
          <p className={styles.carrinho_vazio}>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className={styles.listaProdutos}>
              {produtos.map((p) => (
                <div key={p.id_do_produto} className={styles.item}>
                  <img src={p.imagem_do_produto} alt={p.nome_do_produto} />
                  <div>
                    <h2>{p.nome_do_produto}</h2>
                    <h4>{p.descricao_do_produto}</h4>
                    <p>R$ {parseFloat(p.valor_do_produto).toFixed(2)}</p>
                    <p>{p.parcelamento_do_produto}</p>
                  </div>
                  <div className={styles.quantidade}>
                    <button onClick={() => adicionar(p.id_do_produto)}>+</button>
                    <span>{p.quantidade}</span>
                    <button onClick={() => remover(p.id_do_produto)}>-</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.frete}>
              <h3>Calcular Frete</h3>
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                maxLength={8}
              />
              <button onClick={calcularFrete}>Calcular</button>
              {erroCep && <p className={styles.erro}>{erroCep}</p>}
              {frete !== null && <p className={styles.valorFrete}>Frete: R$ {frete.toFixed(2)}</p>}
            </div>

            <div className={styles.total}>
              <p><strong>Subtotal:</strong> R$ {calcularSubtotal().toFixed(2)}</p>
              <p><strong>Total:</strong> R$ {calcularTotal()}</p>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
