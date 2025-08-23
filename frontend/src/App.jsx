import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter,Routes,Route,Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/register" element={<Register/>}></Route>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
   </Routes>
   <ToastContainer position="top-left" autoClose={2000}/>
   </BrowserRouter>
  )
}
export default App