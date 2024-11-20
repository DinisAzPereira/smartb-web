import React, { useContext, useEffect, useState } from 'react';
import { Card, CardsContainer } from '../ServiceSelect/styles';
import { Container } from './styles';
// import { Container } from './styles';
import { GeralContext } from '../../contexts/GeralContext';



function ServiceSelect({ setSelecionado }) {

    const { agendamento, setAgendamento, saveAgendamento, barbeiros, getServicos } = useContext(GeralContext);
    const [loading, setLoading] = useState(true);
    const [servicos, setServicos] = useState('');
    useEffect(() => {
        (async function () {

            const barbeirosSelecionado = barbeiros?.find(x => x.id == agendamento.barbeiroId);
            const servicosDoBarbeiro = await getServicos([]);

            if (servicosDoBarbeiro) {
                setServicos(servicosDoBarbeiro);
                setLoading(false);

            }

        })();
    }, []) 


    return (
        <Container>
            <CardsContainer>
            {servicos && servicos.map((item,index) => (
                <Card
                    key={index}
                    onClick={() => {
                        setSelecionado(2)
                        setAgendamento({
                            ...agendamento,
                            servico: item.nome,
                            preco: item.preco,
                            Duracao: item.Duracao //Foi preciso incluir a duração
                        })
                    }}>
                   <h1>{item.nome}</h1>
                   <h2>{item.preco}</h2>
                   <h2>{item.Duracao} minutos</h2>
                </Card>
                ))}
            </CardsContainer>
        </Container>
    )
                }

export default ServiceSelect;

