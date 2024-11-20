import React, { useState, createContext } from "react";

import { collection, addDoc, doc, getDoc, onSnapshot, documentId, query, where, getDocs, setDoc } from "firebase/firestore";
import db from './config';

export const GeralContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    //State do agendamento
    const [agendamento, setAgendamento] = useState("");
    const [barbearia, setBarbearia] = useState("");
    const [barbeiros, setBarbeiros] = useState("");

    //Dados que aparecerão na tela de sucesso, ou seja, o agendamento que foi marcado
    const [ congratsData, setCongratsData ] = useState('')

    //Buscar dados

    //Buscar barbearia
    async function getBarbearia(configText) {
        const barbeariasRef = collection(db, "barbearias");
        const consultarBarbearia = query(barbeariasRef, where("configText", "==", configText));


        const querySnapshot = await getDocs(consultarBarbearia);
        querySnapshot.forEach((barbearia) => { // substituição do doc para ficar mais percetivel. A "variavel" barbearia é "criada" nesta linha.
          // doc.data() is never undefined for query doc snapshots
          console.log(barbearia.id, " => ", barbearia.data());   // data = informacao que esta dentro do objeto/ doc / documento
          setBarbearia({
            docId: barbearia.id, // Guardar sempre como DocId para não confundir
            ...barbearia.data()
          })
        });
    }


    //Buscar servicos

    console.log("Barbearia: ", barbearia)

    async function getServicos(servicosPrestados){
        const array = []
        
        const servicosRef = collection(db, `barbearias/${barbearia.docId}/servicos`)
        //qual do documentId esta dentro do servicos que esta dentro do barbeiros
        const consulta = query(servicosRef);

             const querySnaptShot = await getDocs(consulta);
             querySnaptShot.forEach((doc) =>{

                console.log(doc.id, " => " , doc.data());
                array.push({...doc.data(), id: doc.id})
           
         
             });
             if(querySnaptShot.docs.length == 0){

                return array
             }
             return array
             
    }

    
    //Buscar barbeiros
    async function getBarbeiros(array) {
        const docRef = collection(db, "barbeiros");

        // Create a query against the collection.
        const consulta = query(docRef, where('uid', "in", array));

        await onSnapshot(consulta, (querySnapshot) => {
            const database = [];

            const data = querySnapshot.docs;

            for (const doc of data) {
                database.push({ ...doc.data(), docId: doc.id })
            }
            // console.log("Get barbeiros: ", database);
            setBarbeiros(database)
        }, (error) => {
            console.log("Erro get barbeiros: ", error.code)
        });
    }

    async function saveAgendamento() {
        //Data
        const date = new Date();
        console.log("Agendamento data: ", agendamento.data)

        //Adiciona uma marcação com id da data do agendamento // funcao que so e chamada quando se guarda
        return await setDoc(doc(db, "agendamentos", String(agendamento.data)), {

            //adicionar campos aqui
            ...agendamento,
            //servico
            //barbearia: barbearia.nome,
            barbeariaId: barbearia.docId //Está a funcionar agora =)
        }).then(() => {
            return true
        }).catch((error) => {
            return false
        })
    };

    async function getAgendamentosMarcados(timeStart, timeEnd){
        const array = [];
        
        //Consulta agendamentos existentes
        const agendamentosRef = collection(db, "agendamentos");
        const consulta = query(agendamentosRef, 
            where(documentId(), ">=", String(timeStart)),
            where(documentId(), "<=", String(timeEnd)));
        
        //Get nos dados do firebase
        const querySnapshot = await getDocs(consulta);
        
        //Se não tiver agendamentos marcados retorna um array vazio
        if(querySnapshot.docs.length == 0){
            return array
        }

        console.log("DOCS: ", querySnapshot.docs);
        querySnapshot.forEach((doc) => {
            //Se existir agendamentos marcados coloca dentro do array
            array.push({...doc.data(), id: doc.id})
        })

        return array
    }

    const formatDate = (time) => {//Formata a data em ano-mes-dia

        if(!time){
            return null;
        }

        const date = new Date(time);

        const dateString = `${formatNumber(date.getDate())}-${
            formatNumber(date.getMonth()+1)}-${
                date.getFullYear()}`;

        return dateString
    }

    function formatNumber(number){//Insere o 0 caso o numero seja menor que 10. ex: 07
        if(number < 10){
            return `0${number}`
        }else{
            return number
        }
    }

    const formatHours = (time) => {

        const dateNow = new Date(time);

        const hours = dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours();
        const minutes = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes();

        const fullHour = `${hours}:${minutes}`;

        return fullHour
    }

    console.log("Agendamento", agendamento)
    return (
        <GeralContext.Provider
            value={{
                agendamento: agendamento,
                setAgendamento,
                saveAgendamento,

                barbearia: barbearia,
                getBarbearia,

                barbeiros: barbeiros,
                getBarbeiros,
                getServicos,
                getAgendamentosMarcados,
                formatHours,
                formatDate,

                congratsData: congratsData,
                setCongratsData,
            }}
        >
            {children}
        </GeralContext.Provider>
    )
}