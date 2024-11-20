import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfissionalSelect from '../../components/ProfissionalSelect';
import ServiceSelect from '../../components/ServiceSelect';
import { GeralContext } from '../../contexts/GeralContext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ButtonLoading, ClipLoaderContainer, Column, Container, Content, Item, ItemText, ItemTitle, LeftContent, NextButton, RightCard, RightContent, Row } from './styles';
import Typography from '@mui/material/Typography';
import { BottomContainer, BottomWrapper } from './styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import DateSelect from '../../components/DateSelect';
import ClipLoader from 'react-spinners/ClipLoader'

//function AgendamentosPage() {
//const AgendamentosPage = () => {

/*

 <h1 onClick={() =>setSelecionado("Serviço")}>
                    Próximo
                </h1>
                */
const steps = ['Selecione um profissional', 'Selecione um serviço', 'Selecione uma data'];

function AgendamentosPage() {

    const { configText } = useParams();

    const navigate = useNavigate()

    //Importa dados do GeralContext
    const { barbearia, agendamento, getBarbearia, saveAgendamento, formatDate, formatHours, setAgendamento, setCongratsData } = useContext(GeralContext);

    //a carregar
    const [loading, setLoading] = useState(true);
    const [ agendamentoLoading, setAgendamentoLoading ] = useState(false);

    console.log("ID react router dom", configText);

    useEffect(function () {
        (async () => {
            //Se tiver uma barbearia
            if (barbearia) {
                //Para de exibir "A carregar"
                setLoading(false);
            } else {
                setLoading(true)
                await getBarbearia(configText);
            }
        })();
    }, [barbearia])

    const [selecionado, setSelecionado] = useState(0)
    console.log("Selecionado", selecionado);

    //a carregar
    if (loading) {
        return (
            <ClipLoaderContainer>
                <ClipLoader size={89} color="#000" />
            </ClipLoaderContainer>
        )
    }

    //Barbearia não encontrada
    if (barbearia == 'não encontrada') {
        return <h1>Barbearia não encontrada</h1>
    }

    return (

        <Container>

            <Paper
                elevation={5}
                sx={{
                    backgroundColor: "transparent",
                    height: "5%",
                    width: "97.7%",
                    alignSelf: "center",
                    padding: 2,
                    justifyContent: "center",
                }}
            >
                <Stepper activeStep={selecionado}>
                    {steps.map((label, index) => {
                        return (
                            <Step
                                style={{ cursor: 'pointer' }}
                                key={label}
                                onClick={() => setSelecionado(index)}
                            >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Paper>

            <Content>
                <LeftContent>
                    {/* Renderiza os components */}
                    {selecionado == 0 && <ProfissionalSelect setSelecionado={setSelecionado} />}
                    {selecionado == 1 && <ServiceSelect setSelecionado={setSelecionado} />}
                    {selecionado == 2 && <DateSelect setSelecionado={setSelecionado} />}
                </LeftContent>
                <RightContent>
                    <RightCard>
                        <Typography variant="h5" component="h2" style={{ marginBottom: 20 }}>
                            Teu pedido
                        </Typography>

                        {agendamento.barbeiro && (
                            <Item>
                                <ItemTitle>Barbeiro</ItemTitle>
                                <Row>
                                    {agendamento.image64 && (
                                        <img
                                            src={`data:image/jpeg;base64,${agendamento.image64}`}
                                            alt='Imagem não encontrada.'
                                            style={{ height: 50, width: 50, borderRadius: 13 }}
                                        />
                                    )}
                                    
                                    <ItemText>{agendamento.barbeiro}</ItemText>
                                </Row>
                            </Item>
                        )}
                        
                        {agendamento.servico && (
                            <Item>
                                <ItemTitle>Serviço</ItemTitle>
                                <ItemText>{agendamento.servico}</ItemText>
                                <Row>
                                    <ItemText>Duraçao: {agendamento.Duracao} min</ItemText>
                                    <ItemText>Preço: {agendamento.preco}</ItemText>
                                </Row>
                            </Item>
                        )}

                        {agendamento.data && (
                            <Item>
                                <ItemTitle>Data</ItemTitle>
                                <Row>
                                    <ItemText>Dia: {formatDate(agendamento.data)}</ItemText>
                                    <ItemText>Hora: {formatHours(agendamento.data)}</ItemText>
                                </Row>
                            </Item>
                        )}

                        

                        {/* <Typography variant="h5" component="h2">
                            {agendamento.barbeiro}
                        </Typography> */}

                        <BottomContainer>
                            <BottomWrapper>
                                {agendamentoLoading
                                    ? <ButtonLoading>
                                        <ClipLoader size={20} color="#000" />
                                    </ButtonLoading>
                                    :<Button
                                        variant="contained"
                                        disableElevation sx={{
                                            borderRadius: 4,
                                            "&:hover": {

                                                backgroundColor: "#1a1a1a"
                                            },
                                            backgroundColor: "#303036", width: "100%",
                                        }}
                                        onClick={async () => {
                                            if (selecionado == 2) {
                                                setAgendamentoLoading(true)

                                                const result = await saveAgendamento();

                                                if(result){
                                                    //navega para a tela de sucesso
                                                    setCongratsData(agendamento)
                                                    setAgendamento('')
                                                    setAgendamentoLoading(false)
                                                    setSelecionado(0)
                                                    navigate(`/${barbearia.configText}/congrats`);
                                                }else{
                                                    alert('Ocorreu um erro')
                                                }

                                                setAgendamentoLoading(false)
                                            } else {
                                                setSelecionado(selecionado + 1)
                                            }
                                        }}
                                    >
                                        {selecionado == 2 ? 'Marcar agendamento' : 'Próximo'}
                                    </Button>
                                }
                            </BottomWrapper>
                        </BottomContainer>

                    </RightCard>
                </RightContent>
            </Content>

        </Container>
    )
}

export default AgendamentosPage;