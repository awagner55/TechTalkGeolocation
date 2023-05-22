import React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 48.15345797830164,
    longitude: 11.552739081727395,
  })

  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={pin}
        showsUserLocation
        onUserLocationChange={(e)=>{
          console.log("onUserLocationChange", e.nativeEvent.coordinate);
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }}
      >
        <Marker
          coordinate={pin}
          pinColor='blue' 
          draggable={true}
          onDragStart={(e)=>{
            console.log("Drag Start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e)=>{
            console.log("Drag End", e.nativeEvent.coordinate);
 
          }}
           >
            <Callout>
              <Text>Heb mich auf</Text>
            </Callout>
           </Marker>
           <Circle center={pin} radius={100}></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});