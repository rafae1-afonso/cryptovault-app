import { useContext } from 'react';
import styled from 'styled-components';
import { CoinsContext } from '../contexts/CoinsContext';
import VaultCard from '../components/VaultCard';

const VaultContainer = styled.div`
    width: 100%;
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
`;

const EmptyVault = styled.div`
    margin: auto;
    background-color: var(--vault-dark-blue);
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > img {
        @keyframes emptySafeHoverAnimation {
            0% {
                transform: scale(100%);

            }
            25% {
                transform: scale(102.5%) rotate(5deg);
            }
            50% {
                transform: scale(100%) rotate(-5deg);
            }
            100% {
                transform: scale(100%) rotate(0deg);

            }
        }

        &:hover {
            animation: emptySafeHoverAnimation 1s infinite;
        }

        width: 200px;
    }

    & > p {
        padding-top: 20px;
        color: white;
        font-size: 1.5rem;
    }
`

const Vault = () => {
    const { vaultedCoins } = useContext(CoinsContext);

    document.title = "My Vault | CryptoVault";

    return (
        <VaultContainer>
            {
                vaultedCoins.length > 0
                    ? vaultedCoins.map((coin: string) => <VaultCard key={coin} coinId={coin} />)
                    : <EmptyVault>
                        <img src="EmptySafe.png" alt="No Coin" />
                        <p>There's no coin in your vault.</p>
                    </EmptyVault>
            }
        </VaultContainer>
    )
}

export default Vault;