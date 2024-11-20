import styled from 'styled-components';

export const Container = styled.div`
    //flex-box (Ocupa o espaço que puder)
    display: flex;
    flex-direction: column;
    background: rgb(247, 247, 247);

    //Alinha na horizontal

    
    //Alinha na vertical
    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;
`;

export const Content = styled.div`
    display: grid;
    height: 100%;
    
    grid-template-columns: 1.5fr 1fr;

    @media screen and (max-width: 992px){
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 576px){
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 350px){
        grid-template-columns: max-content;
    }

`;

export const LeftContent = styled.div`
    padding: 30px;
    
`;

export const RightContent = styled.div`
    padding: 20px 40px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px){
        padding: 20px 10px;
    }
`;

export const RightCard = styled.div`
    padding: 19px;
    display:flex;
    flex-direction: column;
    border: 0.6px solid #FFF;

    min-height: 600px;
    width: 70%;
    border-radius: 15px;
    background: #FFF;
    box-shadow: 0px -1px 13px 0px rgba(35,54,63,0.54);

    @media screen and (max-width: 1280px){
        width: 100%;
    }

    @media screen and (max-width: 992px){
        width: 60%;
        min-height: 300px;
    }

    @media screen and (max-width: 768px){
        width: 80%;
    }

    @media screen and (max-width: 576px){
        width: 100%;
        margin: 0 10px;
    }
`;

export const BottomWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;


export const BottomContainer = styled.div`
    margin-top: auto;
        `;

export const ButtonLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
`;

export const ClipLoaderContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
 
    justify-content: center;
    align-items: center;

    
    `;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 10px;
    border-bottom: 1px solid #ccc;
    border-bottom-style: dashed;
`;

export const ItemTitle = styled.text`
    font-size: 18px;
    font-weight: 700;
`;

export const ItemText = styled.text`
    font-size: 16px;
    font-weight: 600;
`;
