import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import ProductList from './pages/ProductList'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<Home/>} exact/>
        <Route path="/products" element= {<ProductList/>} />
      </Routes>  
    </div>
  )
}

export default App
