import {createRealmContext} from '@realm/react';
import {Field} from './Field';

const config = {
  schema: [Field],
};

export const RealmContext = createRealmContext(config);
