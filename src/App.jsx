import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home';
import ProdutosEmDestaque from './pages/ProdutosEmDestaque';
import VantagensDaLoja from './pages/VantagensDaLoja';
import CriarConta from './pages/CriarConta';
import Entrar from './pages/Entrar';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade'
import MinhaConta from './pages/MinhaConta';
import RotaProtegida from './components/RotaProtegida';
import MeuCarrinho from './pages/MeuCarrinho';

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

            {/* ROTAS PROTEGIDAS */}
            <Route 
              path="/minhaConta" 
              element={
                <RotaProtegida>
                  <MinhaConta />
                </RotaProtegida>
              }
            />

             <Route 
              path="/meuCarrinho" 
              element={
                <RotaProtegida>
                  <MeuCarrinho />
                </RotaProtegida>
              }
            />
          </Routes>
      </BrowserRouter>
     
   
  )
}

export default App
