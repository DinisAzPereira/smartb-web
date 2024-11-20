import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    padding: 20px;
`;

export const TimeContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    gap: 20px;
    width: 100%;
`;

export const TimeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px 6px;
    border-radius: 20px;

    box-shadow: 0px 4px 20px rgba(35, 54, 63, 0.19);

    //bordas
    border: 1px solid #C7C7CC;

    cursor: pointer;
    user-select: none;

    background: ${props => props.selected ? 'black' : 'none'};

    &:hover{
        background: black;

        //Muda a cor do texto para branco
        h3 {
            color: white;
        }
    }

    h3 {
        font-size: 12px;
        font-weight: 500;
        color: ${props => props.selected ? 'white' : 'black'};;
    }
`;
