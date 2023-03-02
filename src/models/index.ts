import {createRealmContext} from '@realm/react';
import {Field} from './Field';
import {Place} from './Place';

export const RealmContext = createRealmContext({
  schema: [Field, Place],
});
