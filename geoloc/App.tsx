import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-native';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

const App = () => {
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    Geolocation.setRNConfiguration({ skipPermissionRequests: false });
    Geolocation.requestAuthorization();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          Alert.alert(
              'Current Position',
              JSON.stringify(position, null, 2),
              [{ text: 'OK' }],
              { cancelable: false }
          );
        },
        (error: GeolocationError) => {
          Alert.alert('Error', error.message, [{ text: 'OK' }], {
            cancelable: false,
          });
        }
    );
  };

  const watchPosition = () => {
    const id = Geolocation.watchPosition(
        (position: GeolocationResponse) => {
          Alert.alert(
              'Watch Position',
              JSON.stringify(position, null, 2),
              [{ text: 'OK' }],
              { cancelable: false }
          );
        },
        (error: GeolocationError) => {
          Alert.alert('Error', error.message, [{ text: 'OK' }], {
            cancelable: false,
          });
        }
    );
    setWatchId(id);
  };

  const clearWatch = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  return (
      <>
        <Button title="Get Current Position" onPress={getCurrentPosition} />
        <Button title="Watch Position" onPress={watchPosition} />
        <Button title="Clear Watch" onPress={clearWatch} />
      </>
  );
};

export default App;
