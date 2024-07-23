import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { FavStationsList, Header } from '../../components'
import { stationData } from '../../data/local'
import { COLOR } from '../../enums/StyleGuide'
import En from '../../locales/En'
import { useApp } from '../../contexts'

const FavoriteStations = () => {
  const { favorites } = useApp()

  console.log(favorites)
  return (
    <View style={styles.container}>

      <Header
        title={En.favoriteStations}
        addLeft
      />

      <FlatList
        data={favorites}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.documentId?.toString()}
        renderItem={({ item, index }) => <FavStationsList item={item} index={index} />}
      />

    </View>
  )
}

export default FavoriteStations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.fadeWhite
  }
})