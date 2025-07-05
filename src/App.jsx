import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header';
import Home from './components/Home';
import ProdutosEmDestaque from './components/ProdutosEmDestaque';
import VantagensDaLoja from './components/VantagensDaLoja';
import Footer from './components/Footer'

function App() {
  

  return ( 
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/produtos' element={<ProdutosEmDestaque/>}/>
            <Route path='/vantagens' element={<VantagensDaLoja/>}/>
          </Routes>
        <Footer/>  
      </BrowserRouter>
     
   
  )
}

export default App
