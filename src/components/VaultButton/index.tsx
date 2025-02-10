import styled from "styled-components"
import { BsFillSafe2Fill } from "react-icons/bs";
import { useContext } from "react";
import { CoinsContext } from "../../contexts/CoinsContext";
import ICoin from "../../interfaces/ICoin";

const CustomButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const VaultButton = ({ coinIncluded, coin, size = 25 }: { coinIncluded: boolean, coin: ICoin, size?: number }) => {
    const { vaultedCoins, setVaultedCoins } = useContext(CoinsContext);

    return (
        <CustomButton
            title={coinIncluded ? "Remove from vault" : "Add to vault"}
            onClick={() => {
                const newVaultedCoins = !coinIncluded
                    ? [...vaultedCoins, coin.id]
                    : vaultedCoins.filter((vaultedCoin: string) => vaultedCoin !== coin.id)
                setVaultedCoins(newVaultedCoins);
                localStorage.setItem('vaultedCoins', JSON.stringify(newVaultedCoins));
            }}
        >
            <BsFillSafe2Fill size={size} fill={coinIncluded ? "var(--vault-blue)" : "black"} />
        </CustomButton>
    )
}

export default VaultButton