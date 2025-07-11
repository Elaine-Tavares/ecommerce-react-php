import styles from './CriarConta.module.css'
import logo from '../../src/assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'


export default function CriarConta() {
    /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [repeteSenha, setRepeteSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [mensagemErr, setMensagemErr] = useState('')
    const [aceitouTermos, setAceitouTermos] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [ativado, setAtivado] = useState(false)

    useEffect(() => {
      const params = new URLSearchParams(location.search)
      if (params.get('sucesso') === '1') {
        setMensagem('Conta ativada com sucesso! Clique no botão abaixo para logar.')
        setAtivado(true) // ← agora o estado foi alterado

        // Limpa a mensagem depois de 5 segundos (opcional)
        setTimeout(() => setMensagem(''), 5000)
      }
    }, [location])


    const handleSubmit = async (e) => {
      e.preventDefault()
      // leva a janela ao topo do formulário
      window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await api.post('/dimitri_criar_conta.php', {
        email,
        nome,
        telefone,
        senha,
        repeteSenha,
        aceitouTermos
      })
      // sucesso 
      if (response.data.success) {
        //exibe a mensagem de sucesso
        setMensagem(response.data.message) 
      
        //limpa os campos
        setEmail('')
        setNome('')
        setTelefone('')
        setSenha('')
        setRepeteSenha('') 
        setAceitouTermos(false)

          // apaga a mensagem de erro após 3s
          setTimeout(() => {
          setMensagem("") 
        }, 5000);
        return;
      
        } else {
          // leva a janela ao topo do formulário
          window.scrollTo({ top: 0, behavior: 'smooth' });
          //exibe a mensagem de erro
         setMensagemErr(response.data.message)
          // apaga a mensagem de erro após 3s
          setTimeout(() => {
          setMensagemErr("") 
        }, 3000);
          return;
      }

    } catch (error) {
      console.error("Erro:", error)
      setMensagemErr("Erro ao conectar com o servidor.")
      return;
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
      <div className={styles.form_criar_conta}>
      <h2>Preencha os dados para criar sua conta</h2>
      
      {mensagemErr && <p className={styles.mensagemErr}>{mensagemErr}</p> }

      {mensagem && <p className={styles.mensagemSucesso}>{mensagem}</p>}
      {ativado && (
          <button className={styles.botaoLogar} onClick={() => navigate('/entrar')}>Logar</button>
        )}
      <form onSubmit={handleSubmit}>
        <div className={styles.div_form}>
         <label>Adicione o seu e-mail</label>
         <input 
          type="text" 
          placeholder='Você vai receber informações sobre sua conta.' 
          value={email} 
          onChange={e => setEmail(e.target.value)}
         />
        </div>
        <div className={styles.div_form}>
         <label>Informe seu nome</label>
         <input 
          type="text" 
          placeholder='Ele será mostrado às pessoas que interagem com você.'
          value={nome} onChange={e => setNome(e.target.value)}
         />
        </div>
        <div className={styles.div_form}>
         <label>Adicione seu telefone</label>
         <input 
          type="tel" 
          placeholder='Ex: (11) 91234-5678 ou 11912345678' 
          value={telefone} onChange={e => setTelefone(e.target.value)}
         />
        </div>
        <div className={styles.div_form}>
         <label>Crie sua senha</label>
         <input 
          type="password" 
          placeholder='Para manter sua conta protegida.' 
          value={senha} onChange={e => setSenha(e.target.value)}
         />
        </div>
        <div className={styles.div_form}>
         <label>Repita a senha</label>
         <input 
          type="password" 
          placeholder='Repita a senha' 
          value={repeteSenha} onChange={e => setRepeteSenha(e.target.value)}
         />
        </div>

        <div className={styles.div_form}>
          <label>
            <input
              type="checkbox"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
            />
            &nbsp;Li e aceito os&nbsp;
            <Link to="/termos">Termos de Uso</Link> e&nbsp;
            <Link to="/politica">Política de Privacidade</Link>.
          </label>
        </div>
        <div className={styles.div_form}>
        <input type="submit" value="Criar" />
       </div>


    </form> 
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>Já tem uma conta?</p>
      <button className={styles.botaoLogarSecundario} onClick={() => navigate('/entrar')}>
        Fazer login
      </button>
    </div> 
  </div>
</div>
    
  )
}
