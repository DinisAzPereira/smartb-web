import React, { useContext } from "react";
import Paper from '@mui/material/Paper';

import { Container, StyledContainer, StyledTime, StyledService, StyledLocation, StyledPrice, ClipLoaderContainer } from './styles';
import { GeralContext } from "../../contexts/GeralContext";
import ClipLoader from "react-spinners/ClipLoader";

function CongratsPage(){

    const { barbearia, congratsData, formatHours, formatDate } = useContext(GeralContext)

    if(!congratsData){
        return (
            <ClipLoaderContainer>
                <ClipLoader size={89} color="#000" />
            </ClipLoaderContainer>
        )
    }

    return (
        <Container>
            <Paper 
                elevation={3} 
                sx={{ 
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    height: "200px",
                    width: "400px",
                    textAlign: "center",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#4A4A4A",
                }} 
            >
                <StyledContainer>
                    <StyledTime>Dia marcado - {formatDate(congratsData.data)}</StyledTime>
                    <StyledTime>Hora marcada - {formatHours(congratsData.data)}</StyledTime>
                    <StyledService>{congratsData.servico}</StyledService>
                    <StyledLocation>Localização: {barbearia.morada}</StyledLocation>
                    <StyledPrice>Preço: {congratsData.preco}</StyledPrice>
                </StyledContainer>
            </Paper>
        </Container>
    )
}
export default CongratsPage;
