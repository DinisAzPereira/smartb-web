import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;  
`;

export const Card = styled.div`
    //Display flex um embaixo do outro

    &:hover{
        background: #fff	; // duvida aqui 
        box-shadow: 0px 4px 20px rgba(35, 54, 63, 0.05);
    }
    
    display: flex;
    flex-direction: column;

    align-items: center;

    //Espaçamento na borda
    padding: 20px 10px;

    //Tamanho
    /* height: 150px;
    width: 200px; */

    //Cor da borda e tamanho 
    border: 0.3px solid grey;
    //Arredonda mento
    border-radius: 10px;

    //Cursor    
    cursor: pointer;

    //Estilo do texto h1
    h1 {
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        text-align: center;
    }

    h2 {
        font-size: 14px;
        font-weight: 300;
        line-height: 24px;
        text-align: center;

        //Cor do texto
    }
`;

export const CardsContainer = styled.div`
    //Exibição em grade
    display: grid;

    //Exibindo a grade em 3 colunas
    grid-template-columns: repeat(3, 1fr);

    //Espaço entre colunas e linhas
    column-gap: 30px;
    row-gap: 30px;

    //Margem vertical
    margin: 20px 0;

    @media screen and (max-width: 992px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 576px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 350px){
        grid-template-columns: repeat(2, 1fr);
        column-gap: 5px;
        row-gap: 5px;
    }
`;
