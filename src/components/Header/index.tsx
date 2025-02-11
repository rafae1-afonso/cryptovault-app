import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { useContext } from "react";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: white;
    transition: 1s;

    &:hover {
        box-shadow: 0 10px 35px white;
    }
`

const DivLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`

const ImgLogo = styled.img`
    width: 40px;

    @keyframes hoverAnimation {
        0% {
            rotate: 0deg;
        }
        25% {
            rotate: 10deg;
        }
        50% {
            rotate: -10deg;
        }
        100% {
            rotate: 0deg;
        }
    }

    &:hover {
        animation: hoverAnimation 1s infinite;
    }
`

const H1Logo = styled.h1`
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--crypto-yellow);
    margin: 0;

    & > a {
        color: var(--vault-blue);
        text-decoration: none;
        transition: .25s;

        &:hover {
            text-shadow: 0 0 5px var(--vault-neon-blue);
            color: var(--vault-neon-blue);
        }
    }
`

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 30px;

    & > .navLink {
    color: white;
    font-size: 1.15rem;
    transition: .25s;

    &:hover {
        text-decoration: none;
        text-shadow: 0 0 5px var(--crypto-yellow);
        color: var(--crypto-yellow);
    }
}
`

const StyledSelect = styled.select`
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
`

const Header = () => {
    const { setCurrency } = useContext(CurrencyContext);

    const getCurrencyLanguageCode = (currency: string) => {
        switch (currency) {
            case "USD":
                return "en-US";
            case "EUR":
                return "de-DE";
            case "BRL":
                return "pt-BR";
            default:
                return "en-US";
        }
    }

    return (
        <>
            <StyledHeader>
                <DivLogo>
                    <ImgLogo src="Icon.png" alt="Logo" />
                    <H1Logo>Crypto<Link to="/yourvault">Vault</Link></H1Logo>
                </DivLogo>
                <StyledSelect name="Currency" id="" onChange={evento => {
                        setCurrency({ location: getCurrencyLanguageCode(evento.target.value), currency: evento.target.value })
                    }}>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                    <option value="BRL">R$ BRL</option>
                </StyledSelect>
                <a href="https://github.com/rafae1-afonso/cryptovault-app" target="_blank"> <FaGithub size={40} fill="black" /> </a>
            </StyledHeader>
            <StyledNav>
                <Link to="/" className="navLink">Home</Link>
                <Link to="/explore" className="navLink">Explore</Link>
                <Link to="/yourvault" className="navLink">My Vault</Link>
            </StyledNav>
        </>
    )
}

export default Header;