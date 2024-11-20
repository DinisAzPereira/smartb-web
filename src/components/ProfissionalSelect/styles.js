import styled from 'styled-components';

export const Container = styled.div`
    flex-direction: column;
    
   

`;

export const CardsContainer = styled.div`
    //Exibição em grade
    display: grid;
        align-items: left;

    //Exibindo a grade em 3 colunas
    grid-template-columns: repeat(5, 1fr);

    //Espaço entre colunas e linhas
    column-gap: 12px;
    row-gap: 12px;

    //Margem vertical
    margin: 20px 0;

    //Responsividade
    @media screen and (max-width: 992px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 576px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 350px){
        grid-template-columns: max-content;
    }
`;

export const Card = styled.div`
    //Display flex um embaixo do outro

     

     
    &:hover{
        background: #FFF;
        box-shadow: 0px 4px 20px rgba(35, 54, 63, 0.19);
        border:none;
    }

    align-items: center;
    
    display: flex;
    flex-direction: column;

    align-items: center;

    //Espaçamento na borda
    padding: 44px 44px;

    //Tamanho
    /* height: 220px; */
    /* width: 140px; */

    //Cor da borda e tamanho 
    border: 1px solid #C7C7CC;
    //Arredondamento
    border-radius: 20px;

    //Cursor    
    cursor: pointer;

    //Estilo do texto h1
    h1 {
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
    }

    h2 {
        font-size: 14px;
        font-weight: 300;
        line-height: 24px;

        //Cor do texto
        color: #2596be;
    }

    @media screen and (max-width: 576px){
        padding: 22px 22px;
    }
`;

export const Especialidade = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    /* height: 40px;
    width: 100%; */

    background: #C0C0C0;
    border-radius: 9px;

    padding: 6px;

    h1 {
        font-size: 16px;
        font-weight: 600;
        line-height: 0px;
        color: #FFF;
    }
`;
