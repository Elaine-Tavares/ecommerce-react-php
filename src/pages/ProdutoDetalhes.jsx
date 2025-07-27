// Importa o hook que permite acessar os parâmetros da URL (ex: o ID do produto)
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Container from '../components/Container'
import { toast } from 'react-toastify' // ✅ IMPORTAR AQUI
import styles from './ProdutoDetalhes.module.css'
import api from '../services/api.js'

export default function ProdutoDetalhes() {
  // Obtém o ID do produto que está vindo da URL (ex: /produto/7)
  const { id } = useParams()
   // Estado que vai guardar os dados do produto buscado
  const [loading, setLoading] = useState(false)
  const [produto, setProduto] = useState([])
  const [carrinhoFinal, setCarrinhoFinal] = useState([])
  const navigate = useNavigate()

    const produtoDetalhes = async () => {   
      setLoading(true)
    try {
      const response = await api.get(`/elaines_charm_backend/produto_detalhes.php?id_do_produto=${id}`)
      // sucesso 
      if (response.status) {
        //exibe a mensagem de sucesso
        setProduto(response.data.dados)
        console.log("RESPOSTA", response.data.dados)
        setLoading(false)

        const produtoEncontrado = produto.find(p => p.id_do_produto === id)
          if (produtoEncontrado) {
            setProduto(produtoEncontrado)
          }
        return;
      
        } else {
         console.error("Erro ao carregar imagens", response.status) 
         toast.error('Produto não encontrado 😥')
      // navigate('/') // ou redirecione para uma página de erro
    }   
          return;
      }
     catch (error) {
      console.error("Erro ao carregar imagens, catch", error)
      return;
    } 
  }
  
  useEffect(() => {
    produtoDetalhes() 
  }, [id])

  // Se ainda não carregou o produto, exibe uma mensagem temporária
  if (!produto) return <p>Carregando produto...</p>
  

  function addProdutoCarrinho(novoProduto) {
  console.log("NOVO PRODUTO:", novoProduto)

  const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || []
  console.log('CARRINHO ATUAL:', carrinhoAtual)

   // Verifica se o produto já está no carrinho pelo ID
  const produtoJaExiste = carrinhoAtual.some(p => p.id_do_produto === novoProduto.id_do_produto)

  if (produtoJaExiste) {
    toast.warn('Este produto já está no carrinho. ⚠️', {
    // icon: '🚫',
    style: {
      background: 'red',
      color: '#333'
  }
})
    return
  }
 // Se não existir, adiciona e salva
  const novoCarrinho = [...carrinhoAtual, {...novoProduto, quantidade: 1}]
  console.log("NOVOCARRINHO: ", novoCarrinho)

  localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
  console.log("LOCALSTORAGE", localStorage)

  setCarrinhoFinal(novoCarrinho)
  console.log("CARRINHO", carrinhoFinal)

   toast.success('Produto adicionado com sucesso! 🛍️', {
    // icon: '🛍️',
    style: {
      background: 'green',  
      color: '#fff'
  }
})

  // console.log("Carrinho com novo produto:", carrinho)
}



  return (
    <Container>
      {loading}
      <div className={styles.container}>
        <div className={styles.imagens}>
          <img src={produto.imagem_do_produto} alt={produto.imagem_do_produto} className={styles.imagemPrincipal} />
          {/* Se tiver mais imagens, renderize miniaturas aqui */}
        </div>
        <div className={styles.info}>
          <h1>{produto.nome_do_produto}</h1>
          <h4>{produto.descricao_do_produto}</h4>
          <span className={styles.valor_do_produto}>R$ {produto.valor_do_produto}</span> ou
          <span className={styles.valor_do_produto}>R$ {produto.parcelamento_do_produto}</span>
          <button onClick={()=>addProdutoCarrinho(produto)} className={styles.botaoAddCarrinho}>Adicionar ao Carrinho</button>
          <button onClick={()=>navigate('/meuCarrinho')} className={styles.botaoIrCarrinho}>Ir para o Carrinho</button>
        </div>
      </div>
    </Container>
  )
}

