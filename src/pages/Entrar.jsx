import styles from './Entrar.module.css'
import logo from '../assets/logo.webp'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useEffect, useState } from 'react'


export default function Entrar() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  const navigate = useNavigate()
  // Estados para armazenar e-mail, senha e mensagem de erro ou sucesso.
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErr, setMensagemErr] = useState('');
  const [ativado, setAtivado] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const location = useLocation()


  
    useEffect(() => {
      const params = new URLSearchParams(location.search)
      if (params.get('sucesso') === '1') {
        setMensagem('Conta ativada com sucesso! Clique no botão abaixo para logar.')
        setAtivado(true) // ← agora o estado foi alterado

        // Limpa a mensagem depois de 5 segundos (opcional)
        setTimeout(() => setMensagem(''), 5000)
      }
    }, [location])
 
  const handleLogar = async (e) => {
    e.preventDefault();
    // Leva a janela ao topo do formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Envia os dados para a API para verificar se o usuário existe
      const response = await api.post('/elaines_charm_backend/dimitri_login.php', 
        { email, 
          senha 
      });
      
      // Verifica se o login foi bem-sucedido com base na resposta da API
      if (response.data.success) {
         // ✅ Aqui salvamos no localStorage
        localStorage.setItem('usuarioLogado', 'true')
        // console.log(localStorage)    
        console.log('Após login:', localStorage.getItem('usuarioLogado')) // Deve dar null
 
        // Navega para a página inicial ou qualquer outra página após login bem-sucedido
        navigate('/'); // Substitua '/home' pela rota para a página de destino após login.
      } else {
        // Leva a janela ao topo do formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Se login falhar, exibe a mensagem de erro
        setMensagemErr(response.data.message);
        // apaga a mensagem de erro após 3s
        setTimeout(() => {
        setMensagemErr("") 
        }, 3000);
      }
    } catch (error) {
      // Leva a janela ao topo do formulário
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Em caso de erro de rede ou no servidor, exibe uma mensagem genérica
      setMensagemErr('Erro ao tentar efetuar login. Tente novamente mais tarde.', error);
      // apaga a mensagem de erro após 3s
      setTimeout(() => {
      setMensagemErr("") 
      }, 3000);
    }
  }
 
  return (
    <div>
      <div className={styles.navbar}>
       <Link className={styles.container_logo} to="/">
         <img className={styles.logo} src={logo} alt="Logo do site" />
         <h3>Beleza que revela o seu charme</h3>
       </Link>
      </div>
      <div className={styles.form_entrar_conta}>
        {mensagem}
        {ativado && (
          <button className={styles.botaoLogar} onClick={() => navigate('/entrar')}>Logar</button>
        )}
        <h2>Preencha os dados para logar</h2>
        
         {mensagemErr && <p className={styles.mensagemErr}>{mensagemErr}</p> }

        <form onSubmit={handleLogar}>
         <div className={styles.div_form}>
          <label>Informe seu e-mail</label>
          <input 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            type="text" 
            placeholder='Você vai receber informações sobre sua conta.' 
          />
         </div> 
         <div className={styles.div_form}>
          <label>Senha</label>
          <input 
            onChange={(e)=> setSenha(e.target.value)}
            value={senha}
            type="password" 
            placeholder='Para manter sua conta protegida.' 
          />
         </div>
         <div className={styles.div_form}>
          <input type="submit" value="Entrar" />
         </div>
        </form> 
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>Não tem uma conta?</p>
              <button className={styles.botaoCriarContaSecundario} onClick={() => navigate('/criarConta')}>
              Criar Conta
              </button>
          </div>  
      </div>
    </div>
  )
}
