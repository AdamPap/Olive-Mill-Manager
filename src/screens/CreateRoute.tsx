import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  FlatList,
  FormControl,
  Heading,
  Input,
  Modal,
  Spinner,
  Text,
  TextArea,
  useColorModeValue,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  Keyboard,
  Linking,
  NativeSyntheticEvent,
  PermissionsAndroid,
  Platform,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {RootStackParamList} from '../../App';
import Layout from '../components/Layout';

import {RealmContext} from '../models';
import {Field} from '../models/Field';
const {useRealm, useQuery} = RealmContext;

type FormValues = {fieldName: string; ownerName: string; notes: string};

const CreateRoute = () => {
  const [location, setLocation] = useState<GeoPosition | null>();
  const [isLoading, setIsLoading] = useState(true);

  const realm = useRealm();

  useEffect(() => {
    const getLoc = async () => {
      await getLocation();
      setIsLoading(false);
    };

    getLoc();
  }, []);

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

  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
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

  const openAddressOnMap = (label: string, lat: number, lng: number) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    url && Linking.openURL(url);
  };

  const addField = ({fieldName, ownerName, notes}: FormValues) => {
    try {
      realm.write(() => {
        realm.create(
          'Field',
          Field.generate(
            fieldName,
            ownerName,
            location!.coords.longitude,
            location!.coords.latitude,
            notes,
          ),
        );
      });
    } catch (err) {
      console.log("Something went wrong during 'Field' write", err);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('submiting with ', data);
    addField(data);
  };

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box>
          {!isLoading && location ? (
            <Box m={4}>
              <Box>
                <Heading mt={2} size="md" textAlign="center">
                  {`[ ${location?.coords.longitude.toFixed(
                    4,
                  )}, ${location?.coords.latitude.toFixed(4)} ]`}
                </Heading>
              </Box>

              <VStack mt={4} space={3}>
                <FormControl isRequired isInvalid={'fieldName' in errors}>
                  <FormControl.Label _text={{color: 'darkBlue.800'}}>
                    Όνομα Χωραφιού
                  </FormControl.Label>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        onBlur={onBlur}
                        placeholder="Όνομα Χωραφιού"
                        onChangeText={val => onChange(val)}
                        value={value}
                      />
                    )}
                    name="fieldName"
                    rules={{required: 'Field is required', minLength: 3}}
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage>
                    {errors.fieldName?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'ownerName' in errors}>
                  <FormControl.Label _text={{color: 'darkBlue.800'}}>
                    Όνομα Ιδιοκτήτη
                  </FormControl.Label>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        rounded="lg"
                        bg="warmGray.300"
                        onBlur={onBlur}
                        placeholder="Όνομα Ιδιοκτήτη"
                        onChangeText={val => onChange(val)}
                        value={value}
                      />
                    )}
                    name="ownerName"
                    rules={{required: 'Field is required', minLength: 3}}
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage>
                    {errors.ownerName?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={'notes' in errors}>
                  <FormControl.Label _text={{color: 'darkBlue.800'}}>
                    Σημειώσεις
                  </FormControl.Label>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <TextArea
                        rounded="lg"
                        bg="warmGray.300"
                        autoCompleteType={true}
                        placeholder="Σημειώσεις/Οδηγίες"
                        onChangeText={val => onChange(val)}
                        defaultValue={value}
                      />
                    )}
                    name="notes"
                    rules={{minLength: 3}}
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage>
                    {errors.notes?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  bg="darkBlue.800"
                  _pressed={{bg: 'darkBlue.900'}}
                  onPress={handleSubmit(onSubmit)}>
                  Καταχώρηση
                </Button>
              </VStack>
            </Box>
          ) : (
            <Box
              width="100%"
              height="100%"
              pt={5}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Text mb={3}>Λήψη συντεταγμένων...</Text>
              <Spinner size="lg" accessibilityLabel="Loading coordinates" />
            </Box>
          )}
        </Box>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default CreateRoute;
