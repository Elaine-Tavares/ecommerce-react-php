import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home';
import ProdutosEmDestaque from './components/ProdutosEmDestaque';
import VantagensDaLoja from './components/VantagensDaLoja';
import CriarConta from './components/CriarConta';
import Entrar from './components/Entrar';
import TermosDeUso from './components/TermosDeUso';
import PoliticaDePrivacidade from './components/PoliticaDePrivacidade'

function App() {
  

  return ( 
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/produtos' element={<ProdutosEmDestaque/>}/>
            <Route path='/vantagens' element={<VantagensDaLoja/>}/>
            <Route path='/criarConta' element={<CriarConta/>}/>
            <Route path='/entrar' element={<Entrar/>}/>
            <Route path='/termos' element={<TermosDeUso/>}/>
            <Route path='/politica' element={<PoliticaDePrivacidade/>}/>
          </Routes>
      </BrowserRouter>
     
   
  )
}

export default App
