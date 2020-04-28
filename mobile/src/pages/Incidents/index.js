import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png' // Não precisamos passar o "@2x" ou 3x pois ele importa automaticamente a logo no melhor formato de acordo com a tela que ta rodando a nossa aplicação

import styles from './styles'

export default function Incidents() {

  const navigation = useNavigation()

  function navigationToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0) // total de casos
  const [page, setPage] = useState(1) // paginação dos casos
  const [loading, setLoading] = useState(false) // Como vamos implementar a paginação por scroll infinito, quando estivermos buscando os dados temos que evitar que eles sejam buscados novamente. Vamos buscar/carregar uma página por vez

  async function loadIncidents() {
    // evitar de que enquanto uma requisição seja feita outra também venha acontecer
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)

    const response = await api.get('incidents', {
      params: { page }
    })

    setIncidents([ ...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image source={logoImg} />

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}

        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>

        )}
      />

    </View>
  )
}