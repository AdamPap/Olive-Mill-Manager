import {
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Input,
  Link,
  Modal,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {RealmContext} from '../../models';
import {Place} from '../../models/Place';
import CustomAlert from '../Alert';
const {useRealm} = RealmContext;

interface Props {
  place: Place;
  showModal: boolean;
  setShowModal(value: boolean): void;
}

type FormValues = {
  ownerName: string;
  numberOfBags: string;
};

const PlaceEditModal: React.FC<Props> = ({place, showModal, setShowModal}) => {
  const toast = useToast();
  const realm = useRealm();

  const [isClearPressed, setIsClearPressed] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      ownerName: place.ownerName,
      numberOfBags: place.numberOfBags.toString(),
    },
  });

  const editPlace = ({ownerName, numberOfBags}: FormValues) => {
    try {
      realm.write(() => {
        place.ownerName = ownerName;
        place.numberOfBags = parseInt(numberOfBags);
        place.updatedAt = new Date();
      });
      console.log('Updated Place: ', place.placeNumber);
    } catch (err) {
      console.log(
        `Something went wrong during 'Place ${place.placeNumber}' update`,
        err,
      );
    }
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('submitting with ', data);
    editPlace(data);
    setShowModal(false);
    toast.show({
      duration: 2500,
      render: () => {
        return (
          <CustomAlert>{`Επιτυχής Επεξεργασία Θέσης ${place.placeNumber}`}</CustomAlert>
        );
      },
    });
  };

  const clearPlace = () => {
    try {
      realm.write(() => {
        place.ownerName = '';
        place.numberOfBags = 0;
        place.updatedAt = new Date();
      });
      console.log('Cleared Place: ', place.placeNumber);
    } catch (err) {
      console.log(
        `Something went wrong during 'Place ${place.placeNumber}' update`,
        err,
      );
    }
  };

  const handleClear = () => {
    clearPlace();
    setIsClearPressed(false);
    setShowModal(false);

    toast.show({
      duration: 2500,
      render: () => {
        return (
          <CustomAlert>{`Επιτυχής Καθαρισμός Θέσης ${place.placeNumber}`}</CustomAlert>
        );
      },
    });
  };

  const handleModalClose = () => {
    setIsClearPressed(false);
    setShowModal(false);
  };

  const isFormEmpty = () => {
    const values = getValues();

    if (parseInt(values.numberOfBags) === 0 && values.ownerName === '')
      return true;

    return false;
  };

  const onClearPress = () => {
    setIsClearPressed(true);
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={handleModalClose}>
        <Modal.Content maxWidth="400px" bg="warmGray.200">
          <Modal.CloseButton />
          <Modal.Header bg="warmGray.200">
            <HStack alignItems="center">
              <Text
                fontSize="lg"
                color="darkBlue.800"
                fontWeight="bold">{`Θέση ${place.placeNumber}`}</Text>
              {!isClearPressed && (
                <Divider
                  bg="warmGray.300"
                  thickness="1"
                  mx="3"
                  orientation="vertical"
                />
              )}
              {!isClearPressed && (
                <Link
                  colorScheme="emerald"
                  onPress={() => {
                    console.log('History');
                  }}>
                  <Text color="darkBlue.800" fontSize="sm" underline>
                    Ιστορικό
                  </Text>
                </Link>
              )}
            </HStack>
          </Modal.Header>
          <Modal.Body>
            {!isClearPressed ? (
              <VStack space={3}>
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
                  />
                  <FormControl.ErrorMessage>
                    {errors.ownerName?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'numberOfBags' in errors}>
                  <FormControl.Label _text={{color: 'darkBlue.800'}}>
                    Τσουβάλια
                  </FormControl.Label>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        keyboardType="numeric"
                        rounded="lg"
                        bg="warmGray.300"
                        onBlur={onBlur}
                        placeholder="Τσουβάλια"
                        onChangeText={val => onChange(val)}
                        value={value}
                      />
                    )}
                    name="numberOfBags"
                    rules={{required: 'Field is required'}}
                  />
                  <FormControl.ErrorMessage>
                    {errors.numberOfBags?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              </VStack>
            ) : (
              <VStack w="100%">
                <Text mb={4} color="red.600">
                  Καθαρισμός θέσης, είστε σίγουροι;
                </Text>
                <Button.Group justifyContent="space-between">
                  <Button
                    borderRadius="md"
                    bg="darkBlue.800"
                    _pressed={{bg: 'darkBlue.900'}}
                    onPress={handleModalClose}>
                    Ακύρωση
                  </Button>
                  <Button
                    borderRadius="md"
                    colorScheme="red"
                    onPress={handleClear}>
                    Καθαρισμός
                  </Button>
                </Button.Group>
              </VStack>
            )}
          </Modal.Body>
          {!isClearPressed && (
            <Modal.Footer bg="warmGray.200">
              <Button.Group w="100%" justifyContent="space-between">
                <Button
                  isDisabled={isFormEmpty() ? true : false}
                  borderRadius="md"
                  colorScheme="red"
                  onPress={onClearPress}>
                  Καθαρισμός
                </Button>
                <Button
                  borderRadius="md"
                  bg="darkBlue.800"
                  _pressed={{bg: 'darkBlue.900'}}
                  onPress={handleSubmit(onSubmit)}>
                  Αποθήκευση
                </Button>
              </Button.Group>
            </Modal.Footer>
          )}
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PlaceEditModal;
