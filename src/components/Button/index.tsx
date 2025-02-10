import styled from "styled-components"
import ButtonStyles from "../../enums/ButtonStyles";

const getStyleColor = (buttonStyle: string) => {
    switch(buttonStyle) {
        case ButtonStyles.GET_STARTED:
            return 'var(--crypto-yellow)';

        case ButtonStyles.VAULT:
            return 'var(--vault-blue)';
        
        default:
            return 'var(--default-gray)';
    }
}

const StyledButton = styled.button<{ $buttonStyle: string, $fontSize: string }>`
    padding: 10px 20px;
    font-size: ${props => props.$fontSize};
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    background-color: ${props => getStyleColor(props.$buttonStyle)};
    &:hover {
        box-shadow: 0 0 15px ${props => getStyleColor(props.$buttonStyle)};
    }
`

const Button = ({ children, fontSize = '1.5rem', style = 'NONE' }: { children: string, fontSize?: string, style?: string }) => {
    return (
        <StyledButton $buttonStyle={style} $fontSize={fontSize}>{children}</StyledButton>
    )
}

export default Button