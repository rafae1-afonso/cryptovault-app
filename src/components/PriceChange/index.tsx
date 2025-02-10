import styled from "styled-components"
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import PriceChangeIntervals from "../../enums/PriceChangeIntervals";

const Wrapper = styled.div<{ $priceUp: boolean }>`
    margin: 5px;

    & > span {
        display: flex;
        align-items: center;
        color: ${props => props.$priceUp ? 'var(--up-green)' : 'var(--down-red)'};
    }
`

const PriceChange = ({ coin, interval, showInterval = false }: { coin: any, interval: string, showInterval?: boolean }) => {
    let priceChange: number;
    switch (interval) {
        case PriceChangeIntervals.HOUR:
            priceChange = coin.priceChange1h;
            break;
        case PriceChangeIntervals.DAY:
            priceChange = coin.priceChange1d;
            break;
        default:
            priceChange = coin.priceChange1w;
            break;
    }
    const priceChangeUp = priceChange > 0;

    return (
        <Wrapper $priceUp={priceChangeUp}>
            <span>
                {
                    priceChangeUp
                        ? <IoMdArrowDropup size={20} fill="var(--up-green)" />
                        : <IoMdArrowDropdown size={20} fill="var(--down-red)" />
                } {Math.abs(priceChange)}% {showInterval && `(${interval})`}
            </span>
        </Wrapper>
    )
}

export default PriceChange