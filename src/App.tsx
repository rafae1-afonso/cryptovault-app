import AppRoutes from "./routes"
import Header from "./components/Header"
import styled from "styled-components"
import { BrowserRouter } from "react-router"
import { CoinsProvider } from "./contexts/CoinsContext"
import { CurrencyProvider } from "./contexts/CurrencyContext"

const Container = styled.div`
  margin: 20px;
`

function App() {

  return (
    <BrowserRouter>
      <CurrencyProvider>
        <CoinsProvider>
          <Header />
          <Container>
            <AppRoutes />
          </Container>
        </CoinsProvider>
      </CurrencyProvider>
    </BrowserRouter>
  )
}

export default App
