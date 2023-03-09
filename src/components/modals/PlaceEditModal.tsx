import {
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  Modal,
  useToast,
  VStack,
} from 'native-base';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Place} from '../../models/Place';
import CustomAlert from '../Alert';
import {RealmContext} from '../../models';
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
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{`Επεξεργασία Θέσης ${place.placeNumber}`}</Modal.Header>
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
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                colorScheme="green"
                onPress={() => {
                  setShowModal(false);
                }}>
                Ιστορικό
              </Button>
              <Button
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
