import {Realm} from '@realm/react';

export class Field extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  fieldName!: string;
  ownerName!: string;
  notes?: string;
  lng!: number;
  lat!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static generate(
    fieldName: string,
    ownerName: string,
    lng: number,
    lat: number,
    notes?: string,
  ) {
    return {
      id: new Realm.BSON.ObjectId(),
      fieldName,
      ownerName,
      notes,
      lng,
      lat,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Field',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      fieldName: 'string',
      ownerName: 'string',
      notes: 'string?',
      lng: 'float',
      lat: 'float',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
