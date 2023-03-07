import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  TextArea,
  useToast,
  VStack,
} from 'native-base';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {BSON} from 'realm';
import {RootStackParamList} from '../../App';
import CustomAlert from '../components/Alert';
import Layout from '../components/Layout';
import {RealmContext} from '../models';
import {Field} from '../models/Field';

const {useRealm} = RealmContext;

// Coords must be strings inside the form
// and then casted when updating
type FormValues = {
  lng: string;
  lat: string;
  fieldName: string;
  ownerName: string;
  notes: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditField'>;

// TODO: add loading
const EditField = ({route, navigation}: Props) => {
  const {fieldId} = route.params;

  const realm = useRealm();

  // Type casting is required to properly type the result

  const field = realm.objectForPrimaryKey<Field>(
    'Field',
    // Convert string fieldId back to ObjectId
    BSON.ObjectId.createFromHexString(fieldId),
  ) as Field & Realm.Object<Field>;

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      fieldName: field.fieldName,
      ownerName: field.ownerName,
      lng: field.lng.toString(),
      lat: field.lat.toString(),
      notes: field.notes,
    },
  });

  const editField = ({fieldName, ownerName, notes, lng, lat}: FormValues) => {
    try {
      realm.write(() => {
        field.fieldName = fieldName;
        field.ownerName = ownerName;
        field.lng = parseFloat(lng);
        field.lat = parseFloat(lat);
        field.notes = notes;
      });
      console.log('Updated Field: ', field);
    } catch (err) {
      console.log("Something went wrong during 'Field' update", err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('submitting with ', data);
    editField(data);
    toast.show({
      duration: 2500,
      render: () => {
        return <CustomAlert>Επιτυχής Επεξεργασία Χωραφιού</CustomAlert>;
      },
    });
    navigation.navigate('AllRoutes');
  };

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box m={4}>
          <VStack mt={4} space={3}>
            <HStack justifyContent="space-between">
              <FormControl width="48%" isRequired isInvalid={'lng' in errors}>
                <FormControl.Label _text={{color: 'darkBlue.800'}}>
                  Γεωγραφικό Μήκος
                </FormControl.Label>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      placeholder="Γεωγραφικό Μήκος"
                      onChangeText={val => onChange(val)}
                      value={value.toString()}
                    />
                  )}
                  name="lng"
                  rules={{required: 'Field is required'}}
                />
                <FormControl.ErrorMessage>
                  {errors.lng?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl width="48%" isRequired isInvalid={'lat' in errors}>
                <FormControl.Label _text={{color: 'darkBlue.800'}}>
                  Γεωγραφικό Πλάτος
                </FormControl.Label>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      onBlur={onBlur}
                      placeholder="Γεωγραφικό Πλάτος"
                      onChangeText={val => onChange(val)}
                      value={value.toString()}
                    />
                  )}
                  name="lat"
                  rules={{required: 'Field is required'}}
                />
                <FormControl.ErrorMessage>
                  {errors.lng?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>

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
              mt={3}
              bg="darkBlue.800"
              _pressed={{bg: 'darkBlue.900'}}
              onPress={handleSubmit(onSubmit)}>
              Αποθήκευση
            </Button>
          </VStack>
        </Box>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default EditField;
