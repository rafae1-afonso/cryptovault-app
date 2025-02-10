import React from "react";
import styled from "styled-components";

const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid var(--default-gray);
    font-weight: bold;

    & > h1 {
        font-size: 1.15rem;
    }

    & > p {
        font-size: 1.75rem;
        margin: 0;
    }
`

const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <StyledCardContainer>
            <h1>{title}</h1>
            <p>{children}</p>
        </StyledCardContainer>
    )
}

export default InfoCard