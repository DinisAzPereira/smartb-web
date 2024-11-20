import React, { useState, useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import 'dayjs/locale/en-gb';

import { Container, TimeContainer, TimeItem } from './styles';
import { Typography } from '@mui/material';
import { GeralContext } from '../../contexts/GeralContext';
import { useEffect } from 'react';

function DateSelect() {

    const { barbearia, formatHours, getAgendamentosMarcados, agendamento, setAgendamento } = useContext(GeralContext)

    const [ date, setDate ] = useState('');
    const [ hour, setHour ] = useState('');

    const [ horariosDisponiveis, setHorariosDisponponiveis ] = useState('');

    function handleData(newValue){
        const date = new Date(newValue);

        setDate(date.getTime())
    }

    useEffect(() => {
        (async () => {
            if(date){
                const dateAgendamento = new Date(date)

                const nomes = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

                const stringDate = `${dateAgendamento.getFullYear()}-${formatNumber(dateAgendamento.getMonth()+1)}-${formatNumber(dateAgendamento.getDate())}`;

                const indexDiaSemana = dateAgendamento.getDay();

                const nomeDiaSemana = nomes[indexDiaSemana]

                //Funcionamento da barbearia
                const abertura = barbearia.funcionamento[nomeDiaSemana].abertura;
                const horaDeFechar = barbearia.funcionamento[nomeDiaSemana].horaDeFechar;

                //Valor em milisegundos de acordo com horário de funcionamento
                const timeStart = new Date(`${stringDate}T${abertura}`).getTime();
                const timeEnd = new Date(`${stringDate}T${horaDeFechar}`).getTime();

                //Obtem os agendamentos da base de dados
                const agendamentosMarcados = await getAgendamentosMarcados(timeStart, timeEnd);

                //Verifica horários disponíveis
                getHorarios(timeStart, timeEnd, agendamentosMarcados)
            }
        })();
    }, [date]);

    function formatNumber(number){
        if(number < 10){
            return `0${number}`
        }else{
            return number
        }
    }

    function getHorarios(timeStart, timeEnd, agendamentosMarcados){
        const arrayHorarios = []

        const valorMinuto = 60000;

        const intervalo = (Number(agendamento.Duracao) * valorMinuto);

        //Realiza um loop nos horários de acordo com o intervado de corte
        for(var hora = timeStart; hora <= timeEnd; hora = hora + intervalo){
            
            //Verifica indisponibilidade do horário
            const indisponivel = agendamentosMarcados.find(agendamentoMarcado => 
                //Se encontrar um agendamento marcado antes da hora escolhida, verifica se ele vai terminar a tempo de marcar outro em seguida 
                (agendamentoMarcado.data <= hora && (agendamentoMarcado.data+(Number(agendamentoMarcado.Duracao)*valorMinuto)) > hora 
                    && agendamentoMarcado.barbeiroId == agendamento.barbeiroId)
                //Se encontrar um agendamento marcado depois da hora escolhida, o agendamento de agora não irá afetar o próximo
                || (agendamentoMarcado.data >= hora && (hora+intervalo) >= agendamentoMarcado.data
                    && agendamentoMarcado.barbeiroId == agendamento.barbeiroId))
            
            if(!indisponivel){ //Se a variavel indisponível for falsa, ou seja, se estiver disponível
                arrayHorarios.push(hora);
            }
        }

        setHorariosDisponponiveis(arrayHorarios)
    }

    return (
        <Container>
            <Typography 
                variant="h5"
                component="h5"
                sx={{ marginBottom: 2 }}    
            >
                Escolha uma data
            </Typography>
            <LocalizationProvider adapterLocale='en-gb' dateAdapter={AdapterDayjs}>
                <DatePicker 
                    orientation="portrait"  
                    label="Calendário"
                    onChange={(newValue) => handleData(newValue)}
                    sx={{ marginBottom: 2 }} 
                />
            </LocalizationProvider>

            <Typography 
                variant="h5"
                component="h5"
                sx={{ marginBottom: 2, marginTop: 10 }}    
            >
                Escolha um horário
            </Typography>
            <TimeContainer>
                {date && horariosDisponiveis && horariosDisponiveis.map((item, index) => (
                    <TimeItem 
                        key={index} 
                        selected={agendamento.data == item ? true : false}
                        onClick={() => setAgendamento({
                            ...agendamento,
                            data: item,
                        })}
                    >
                        <h3>{formatHours(item)}</h3>
                    </TimeItem>
                ))}
            </TimeContainer>
        </Container>
    )
}

export default DateSelect;