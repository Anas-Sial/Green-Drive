import { StyleSheet } from 'react-native'
import React from 'react'
import { MarkerSVG } from '../../assets/svg'
import MapView, { Marker } from 'react-native-maps'

const Map = ({ lat, long, data, onSelect }) => {
    return (
        <MapView
            style={styles.MapStyle}
            region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>
            {data?.map((item, index) => (
                <Marker
                    key={index}
                    onPress={() => onSelect(index)}
                    coordinate={{ latitude: item.location?.latitude, longitude: item?.location?.longitude }}
                >
                    <MarkerSVG height={60} onPress={() => onSelect(index)} />
                </Marker>
            ))}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    MapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
})