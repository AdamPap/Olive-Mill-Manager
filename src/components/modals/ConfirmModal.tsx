import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Center,
  FormControl,
  Input,
  Modal,
  Text,
  useToast,
} from 'native-base';
import React from 'react';
import {BSON} from 'realm';
import {RootStackParamList} from '../../../App';
import {RealmContext} from '../../models';
import {Field} from '../../models/Field';
import CustomAlert from '../Alert';
const {useRealm} = RealmContext;

interface Props {
  field: Field;
  showModal: boolean;
  setShowModal(value: boolean): void;
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditField'
>;

const ConfirmModal: React.FC<Props> = ({field, showModal, setShowModal}) => {
  const toast = useToast();
  const realm = useRealm();

  const navigation = useNavigation<NavigationProp>();

  const handleDelete = () => {
    // Type casting is required to properly type the result
    const fieldToDelete = realm.objectForPrimaryKey<Field>(
      'Field',
      field.id,
    ) as Field & Realm.Object<Field>;

    try {
      realm.write(() => {
        realm.delete(fieldToDelete);
        // Discard reference
        // field = undefined
      });
      toast.show({
        duration: 2500,
        render: () => {
          return <CustomAlert>{`Επιτυχής Διαγραφή Χωραφιού`}</CustomAlert>;
        },
      });
      navigation.navigate('AllRoutes');
    } catch (err) {
      console.log(`Something went wrong during Field delete`, err);
    }
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" bg="warmGray.200">
          <Modal.CloseButton />
          <Modal.Header bg="warmGray.200">Διαγραφή χωραφιού</Modal.Header>
          <Modal.Body>
            <Text>
              <Text>Επιβεβαιώνεται την διαγραφή του </Text>
              <Text bold>{field.fieldName ?? ''}</Text>
            </Text>
          </Modal.Body>
          <Modal.Footer bg="warmGray.200">
            <Button.Group space={2}>
              <Button
                bg="warmGray.200"
                _pressed={{bg: 'warmGray.400'}}
                _text={{color: 'darkBlue.800'}}
                onPress={() => {
                  setShowModal(false);
                }}>
                Ακύρωση
              </Button>
              <Button
                bg="red.700"
                _pressed={{bg: 'red.800'}}
                onPress={handleDelete}>
                Διαγραφή
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ConfirmModal;
