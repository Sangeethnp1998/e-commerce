import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import ProductList from './pages/ProductList'
import PlaceOrder from './pages/PlaceOrder'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<Home/>} exact/>
        <Route path="/products" element= {<ProductList/>} />
        <Route path="/cart" element= {<PlaceOrder/>} />
      </Routes>  
    </div>
  )
}

export default App
