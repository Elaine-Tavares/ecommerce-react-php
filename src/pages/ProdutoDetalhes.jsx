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
  const [carrinho, setCarrinho] = useState([])
  const navigate = useNavigate()
  const [carrProduto, setCarrProduto] = useState(false)
  const [loading, setLoading] = useState(false)
  const [objetos, setObjetos] = useState([])

    const carregarCarousel = async () => {   
      setLoading(true)
    try {
      const response = await api.get('/produto_detalhes.php')
      // sucesso 
      if (response.data.success) {
        //exibe a mensagem de sucesso
        setObjetos(response.data.message)
        setLoading(false)
        return;
      
        } else {
         console("Erro ao carregar imagens", response.data.message)    
          return;
      }
    } catch (error) {
      console.error("Erro ao carregar imagens, catch", error)
      return;
    } 
  }


  useEffect(() => {
    carregarCarousel()
  }, [])

  function addProdutoCarrinho(novoProduto) {
  console.log("novo produto:", novoProduto)
  const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || []
  console.log('carrinho atual:', carrinhoAtual)

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
  const novoCarrinho = [...carrinhoAtual, novoProduto]
  console.log("novoCarrinho: ", novoCarrinho)

  localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
  console.log("localStorage", localStorage)

  setCarrinho(novoCarrinho)
  console.log("carrinho", carrinho)

   toast.success('Produto adicionado com sucesso! 🛍️', {
    // icon: '🛍️',
    style: {
      background: 'green',  
      color: '#fff'
  }
})

  // console.log("Carrinho com novo produto:", carrinho)
}

  useEffect(() => {
    const produtoEncontrado = objetos.find(p => p.id_do_produto === id)
    if (produtoEncontrado) {
      setCarrProduto(produtoEncontrado)
    } else {
      toast.error('Produto não encontrado 😥')
      navigate('/') // ou redirecione para uma página de erro
    }
  }, [id, navigate])

  // Se ainda não carregou o produto, exibe uma mensagem temporária
  if (!carrProduto) return <p>Carregando produto...</p>

  return (
    <Container>
      {loading}
      <div className={styles.container}>
        <div className={styles.imagens}>
          <img src={carrProduto.imagem_do_produto} alt={carrProduto.imagem_do_produto} className={styles.imagemPrincipal} />
          {/* Se tiver mais imagens, renderize miniaturas aqui */}
        </div>
        <div className={styles.info}>
          <h1>{carrProduto.nome_do_produto}</h1>
          <h4>{carrProduto.descricao_do_produto}</h4>
          <span className={styles.valor_do_produto}>R$ {carrProduto.valor_do_produto}</span> ou
          <span className={styles.valor_do_produto}>R$ {carrProduto.parcelamento_do_produto}</span>
          <button onClick={()=>addProdutoCarrinho(carrProduto)} className={styles.botaoAddCarrinho}>Adicionar ao Carrinho</button>
          <button onClick={()=>navigate('/meuCarrinho')} className={styles.botaoIrCarrinho}>Ir para o Carrinho</button>
        </div>
      </div>
    </Container>
  )
}

