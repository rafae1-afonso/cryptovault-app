import { Route } from "react-router"
import Home from "./pages/Home"
import { Routes } from "react-router"
import Explore from "./pages/Explore"
import Vault from "./pages/Vault"
import Info from "./pages/Info"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/yourvault" element={<Vault />} />
      <Route path="/info/:id" element={<Info />} />
    </Routes>
  )
}

export default AppRouter;