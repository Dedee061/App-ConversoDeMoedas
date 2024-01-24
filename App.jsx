import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Picker from './src/componetns/Picker';

import api from './src/service/Api';


export default function App() {

  const [ moedas , setMoedas] = useState([])
  const [moedaSeleciona, setMoedaSelecionada] = useState(null)
  const [moedaValor, setMoedaValor] = useState(0)
  const [valorMoeda, setValorMoeda] = useState(null) 
  const [ valorConvertido, setValorConvertido ] = useState(0)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all')

      let arrayMoedas = []
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      })

      setMoedas(arrayMoedas)
      setLoading(false)
    }

    loadMoedas()
  }, [])

 async  function converter() {
  if(moedaSeleciona === null || moedaValor === 0 ) {
    alert('Selecione uma moeda')
    return
  }
  // USD-BRL ele devolve quanto é 1 dolar convertido pra reais
  const response = await api.get(`all/${moedaSeleciona}-BRL`)
  // console.log(response.data[moedaSeleciona].ask)

  let resultado = (response.data[moedaSeleciona].ask * parseFloat(moedaValor))

  setValorConvertido(` R$ ${resultado.toFixed(2)}`)
  setValorMoeda(moedaValor)
  // aqui ele fecha o teclado se estive aberto
    Keyboard.dismiss()
 }

  if(loading) {
    return(
      // aréa de loading
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#101215'}}>
        <ActivityIndicator size={45} color="#fff"/> 
    </View>
    )
  } else {

    return (
      <View style={s.container}>
        <View style={s.areaMoeda}>
          <Text style={s.title}>Selecione sua moeda</Text>
          <Picker moedas={moedas} onChange={ (moeda) => setMoedaSelecionada(moeda)}/>
        </View>
        <View style={s.areaValor}>
          <Text style={s.title}>Digite um valor para converter em (R$)</Text>
  
          <TextInput  style={s.input} placeholder="50" placeholderTextColor="#fff4" keyboardType='numeric' onChangeText={(valor) => setMoedaValor(valor)}/>
        </View>
  
        <TouchableOpacity style={s.buttonArea} onPress={converter}>
          <Text style={s.buttonText}>Converter</Text>
        </TouchableOpacity>
        
        
        {valorConvertido !== 0 && (

        <View style={s.areaResultado}> 
          <Text style={s.valorConvertido}>{valorMoeda} {moedaSeleciona}</Text>
          <Text style={[s.valorConvertido, {fontSize: 18, margin: 10}]}>convertido a </Text>
          <Text style={s.valorConvertido}>{valorConvertido}</Text>
        
        </View>
        )}

      </View>
    );
  }

}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 40,
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#1f2329',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },
  title: {
    fontSize: 15, 
    color: '#fff',
    paddingTop: 5,
    paddingLeft: 5,
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#1f2329',
    paddingBottom: 9,
    paddingTop: 9,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 9,
    color: '#fff',
  },
  buttonArea:{
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  areaResultado: {
    backgroundColor: '#1f2329',
    width: '90%',
    marginTop: 35,
    alignItems:'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 15
  },
  valorConvertido: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#fff'
  }

});
