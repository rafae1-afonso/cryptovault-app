import styled from "styled-components"
import CoinRowItem from "../components/CoinRowItem"
import { useEffect, useContext, useState } from "react"
import { CoinsContext } from "../contexts/CoinsContext"
import { IoMdRefreshCircle } from "react-icons/io";
import getAPIMethod from "../utils/GetAPI";
import { CurrencyContext } from "../contexts/CurrencyContext";

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;
`

const RefreshButton = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    left: 47%;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
`

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 20px;
    font-size: 1.5rem;
    border-radius: 50px;
    border: var(--crypto-yellow) 2px solid;
    cursor: text;
    transition: 0.3s;
    margin-bottom: 30px;

    @media (max-width: 500px) {
        font-size: 1rem;
    }
`

const TableContainer = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    border: var(--crypto-yellow) 2px solid;
    padding: 20px;
`

const Explore = () => {
    const { currency } = useContext(CurrencyContext);
    const { coinsList, setCoinsList } = useContext(CoinsContext);
    const [loading, setLoading] = useState(true)

    document.title = "Explore | CryptoVault";

    const fetchCoins = async (apiUrl: string) => {
        setLoading(true);
        const response = await getAPIMethod(apiUrl);
        setLoading(false);
        response && setCoinsList(response.data.result);
    }

    useEffect(() => {
        fetchCoins(`https://openapiv1.coinstats.app/coins?limit=100&currency=${currency.currency}`);
    }, [currency])

    return (
        <StyledMain>
            <StyledForm onSubmit={(event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const inputValue = (form.elements[0] as HTMLInputElement).value
                fetchCoins(`/api/coins?limit=100&name=${inputValue}&currency=${currency.currency}`)
            }}>
                <SearchInput type="search" placeholder="Search For Coin"></SearchInput>
            </StyledForm>
            <RefreshButton onClick={() => { fetchCoins(`/api/coins?limit=100&currency=${currency.currency}`) }} ><IoMdRefreshCircle size={40} fill="white" /></RefreshButton>
            <TableContainer className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">1h %</th>
                            <th scope="col">Market Cap</th>
                            <th scope="col">Volume</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading
                                ? coinsList.map(coin => {
                                    return <CoinRowItem key={coin.id} coin={coin} />
                                })
                                : <tr><td>Loading...</td></tr>
                        }
                    </tbody>
                </table>
            </TableContainer>
        </StyledMain>
    )
}

export default Explore