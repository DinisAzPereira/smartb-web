import React, { useContext, useEffect } from 'react';
import { GeralContext } from '../../contexts/GeralContext';


import { Container, CardsContainer, Card, Especialidade, NextButton } from './styles';

function ProfissionalSelect({ setSelecionado }) {

    const { barbearia, agendamento, setAgendamento, barbeiros, getBarbeiros } = useContext(GeralContext);

    useEffect(function() {
        (async () => {
            if(barbeiros){
                console.log("BARBEIROS: ", barbeiros)
            }else{
                await getBarbeiros(barbearia.barbeirosIds)
            }
        })();
    }, [barbeiros]);

    if(!barbeiros){
        return <h1>Não há barbeiros</h1>
    }

    
   
      return (
        <Container>
          <CardsContainer>
            {barbeiros.map((barbeiro, index) => (
              <Card
                key={index}
                onClick={() => {
                  setAgendamento({
                    ...agendamento,
                    barbeiro: barbeiro.nome,
                    barbeiroId: barbeiro.docId,
                    image64: barbeiro.image64,
                  });
                  setSelecionado(1);
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${barbeiro.image64}`}
                  alt='Imagem não encontrada.'
                  style={{ aspectRatio: 1, maxHeight: 80, borderRadius: 13, }}
                />
                <h1>{barbeiro.nome}</h1>
    
                {/* <Especialidade>
                  <h1>{barbeiro.especialidade}</h1>
                </Especialidade> */}
              </Card>
            ))}
          </CardsContainer>
        </Container>
      );
    }
export default ProfissionalSelect;