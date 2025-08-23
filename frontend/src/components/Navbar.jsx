import { useEffect ,useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

function Navbar() {
    const[isLoggedIn ,setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

useEffect (()=>{
        setIsLoggedIn(!!localStorage.getItem("token"))

},[useLocation().pathname])


const handleLogout = ()=>{
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    toast.success("Logged out successfully!");
    navigate("/")
}
  return (
    <nav className="p-4 bg-[rgba(0,0,0,0.3)] flex gap-5 fixed w-full text-white justify-end font-light">
        {isLoggedIn ?(
            <>
            <Link to="/dashboard" className="p-1 hover:text-cyan-400">Dashboard</Link>
            <button
              onClick={handleLogout}
              className=" hover:bg-red-800 hover:rounded hover:font-semibold hover:px-2"
            >
              Logout
            </button>
            </>
        ):(
         <>
        <Link to="/register" className="p-1 hover:text-cyan-400">Register</Link>
        <Link to="/" className="p-1 hover:text-cyan-400" >Login</Link>
         </>
        )}
    </nav>
  )
}

export default Navbar