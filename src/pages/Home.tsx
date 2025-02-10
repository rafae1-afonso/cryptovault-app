import styled from "styled-components"
import Button from "../components/Button"
import ButtonStyles from "../enums/ButtonStyles"
import { Link } from "react-router"

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    gap: 20px;

    h1 {
        color: white;
        font-size: 3rem;

        @media (max-width: 700px) {
            font-size: 2rem;
        }

        @media (max-width: 500px) {
            font-size: 1.5rem;
        }

        span {
            color: var(--crypto-yellow);
            font-size: 4rem;

            @media (max-width: 700px) {
                font-size: 3rem;
            }

            @media (max-width: 500px) {
                font-size: 2rem;
            }
        }
    }
`

const Home = () => {

    document.title = "CryptoVault - Cryptocurrency info hub";

    return (
        <StyledMain>
            <h1>Follow your favorite <span>cryptos!</span></h1>
            <Link to="/explore"><Button style={ButtonStyles.GET_STARTED}>Get started</Button></Link>
        </StyledMain>
    )
}

export default Home