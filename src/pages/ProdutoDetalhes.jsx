// Importa o hook que permite acessar os parâmetros da URL (ex: o ID do produto)
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import styles from './ProdutoDetalhes.module.css'
import Container from '../components/Container'
import { toast } from 'react-toastify' // ✅ IMPORTAR AQUI

export default function ProdutoDetalhes() {
  // Obtém o ID do produto que está vindo da URL (ex: /produto/7)
  const { id } = useParams()
  // Estado que vai guardar os dados do produto buscado
  const [produto, setProduto] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const navigate = useNavigate()


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

  // useEffect é executado quando o componente é montado
  // e também se o 'id' mudar (por segurança)
  useEffect(() => {
    // Função assíncrona para buscar o produto no backend  
    const carregarProduto = async () => {
      try {   
        // Faz uma requisição GET para buscar os dados do produto com base no ID
        const response = await api.get(`/produto_detalhes.php?id_do_produto=${id}`)
        // Salva os dados recebidos no estado 'produto'
        setProduto(response.data.dados)// pega apenas os dados do produto
         
      } catch (erro) {
        // Se algo der errado, exibe o erro no console
        console.error('Erro ao carregar produto:', erro)
      }
    }
    // Chama a função de carregamento do produto
    carregarProduto()
  }, [id])// Executa o useEffect novamente se o 'id' mudar

  // Se ainda não carregou o produto, exibe uma mensagem temporária
  if (!produto) return <p>Carregando produto...</p>

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.imagens}>
          <img src={produto.imagem_do_produto} alt={produto.nome_do_produto} className={styles.imagemPrincipal} />
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

