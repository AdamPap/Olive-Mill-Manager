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

  const {
    control,
    handleSubmit,
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

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" bg="warmGray.200">
          <Modal.CloseButton />
          <Modal.Header bg="warmGray.200">
            <HStack alignItems="center">
              <Text
                fontSize="lg"
                color="darkBlue.800"
                fontWeight="bold">{`Θέση ${place.placeNumber}`}</Text>
              <Divider
                bg="warmGray.300"
                thickness="1"
                mx="3"
                orientation="vertical"
              />
              <Link
                colorScheme="emerald"
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text color="darkBlue.800" fontSize="sm" underline>
                  Ιστορικό
                </Text>
              </Link>
            </HStack>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer bg="warmGray.200">
            <Button.Group w="100%" justifyContent="space-between">
              <Button
                borderRadius="md"
                colorScheme="red"
                onPress={() => {
                  setShowModal(false);
                }}>
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
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PlaceEditModal;
