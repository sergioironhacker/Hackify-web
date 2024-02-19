import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
/* import NavBar from "./components/NavBar" */
import Login from "./pages/Login"


function App() {

  return (
    <div>
   {/*    <NavBar /> */}
  

      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      
        </Routes>
      </div>
    </div>
  )
}

export default App
