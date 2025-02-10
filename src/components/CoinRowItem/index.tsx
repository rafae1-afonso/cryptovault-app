import styled from "styled-components";
import { BiSolidDetail } from "react-icons/bi";
import MoneyFormatingMethod from "../../utils/MoneyFormating";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CoinsContext } from "../../contexts/CoinsContext";
import PriceChange from "../PriceChange";
import PriceChangeIntervals from "../../enums/PriceChangeIntervals";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import VaultButton from "../VaultButton";

const CustomButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledTr = styled.tr`
    font-weight: bold;
    transition: .15s;
    cursor: default;

    &:hover {
        background-color: #e6e6e6
    }
`

const Wrapper = styled.div`
    margin: 5px;

    & > span {
        display: flex;
        align-items: center;
    }
`

const NameWrapper = styled.div`
    & > img {
        width: 30px;
        margin-right: 10px;
        margin-bottom: 5px;
        border-radius: 100%;
    }

    & > span {
        color: var(--default-gray);
        font-size: 0.8rem
    }
`

const CoinRowItem = ({ coin }: { coin: any }) => {
    const navigate = useNavigate();
    const { setSelectedCoin } = useContext(CoinsContext);
    const { currency } = useContext(CurrencyContext);
    const { vaultedCoins } = useContext(CoinsContext);
    const [coinIncluded, setCoinIncluded] = useState(false);

    const navigateTo = (url: string) => {
        navigate(url);
    }

    useEffect(() => {
        setCoinIncluded(vaultedCoins.includes(coin.id));
        return
    }, [vaultedCoins])

    return (
        <StyledTr>
            <th scope="row"><Wrapper>{coin.rank}</Wrapper></th>
            <td><NameWrapper><img src={coin.icon} alt={coin.name} />{coin.name} <span>{coin.symbol}</span></NameWrapper></td>
            <td><Wrapper>{MoneyFormatingMethod({ value: coin.price, location: currency.location, currency: currency.currency })}</Wrapper></td>
            <td><PriceChange coin={coin} interval={PriceChangeIntervals.HOUR} /></td>
            <td><Wrapper>{MoneyFormatingMethod({ value: coin.marketCap, location: currency.location, currency: currency.currency })}</Wrapper></td>
            <td><Wrapper>{MoneyFormatingMethod({ value: coin.volume, location: currency.location, currency: currency.currency })}</Wrapper></td>
            <td><CustomButton onClick={() => {
                setSelectedCoin(coin);
                navigateTo(`/info/${coin.id}`)
            }} title="Informations"><BiSolidDetail size={28} fill="black" /></CustomButton></td>
            <td><VaultButton
                coinIncluded={coinIncluded}
                coin={coin}
            />
            </td>
        </StyledTr>
    )
}

export default CoinRowItem;