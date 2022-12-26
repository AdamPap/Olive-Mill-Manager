import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {Button, PermissionsAndroid, StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_TOKEN} from '@env';
import {RootStackParamList} from '../../App';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRoute'>;

const CreateRoute = ({route, navigation}: Props) => {
  const [location, setLocation] = useState<GeoPosition | null>();
  const [coordinates] = useState([25.394438632803254, 35.05741642226443]);

  const [offlinePackLength, setofflinePackLength] = useState(0);

  useEffect(() => {
    getOfflinePacks();
  }, []);

  useEffect(() => {
    console.log(offlinePackLength);
    offlinePackLength && createOfflinePack();
  }, [offlinePackLength]);

  const createOfflinePack = async () => {
    if (!offlinePackLength) {
      console.log('No Offline packs, downloading...');

      try {
        await MapboxGL.offlineManager.createPack(
          {
            name: 'offline-map',
            styleURL: MapboxGL.StyleURL.Outdoors,
            bounds: [
              [25.1975, 25.6082],
              [34.9742, 35.1488],
            ],
            minZoom: 12,
            maxZoom: 16,
          },
          // progressListener, errorListener
          // error => {
          //   if (error) {
          //     console.log('-> Offline map error: ', error);
          //   }
          // },
          (offlineRegion, status) => console.log('', offlineRegion, status),
          (offlineRegion, err) => console.log(offlineRegion, err),
        );
        console.log('Downloading end...');
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Offline packs already downloaded');
    }
  };

  const getOfflinePacks = async () => {
    const offlinePack = await MapboxGL.offlineManager.getPacks();
    setofflinePackLength(offlinePack.length);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(null);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  return (
    <Box>
      <Box
        paddingBottom={4}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <View
          style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
          <Button title="Get Location" onPress={getLocation} />
        </View>
        <Text>Longitude: {location?.coords.longitude}</Text>
        <Text>Latitude: {location?.coords.latitude}</Text>
      </Box>
      <Box w="100%" h="400">
        <MapboxGL.MapView style={{flex: 1}}>
          <MapboxGL.Camera zoomLevel={13} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation coordinate={coordinates} />
        </MapboxGL.MapView>
      </Box>
    </Box>
  );
};

export default CreateRoute;
