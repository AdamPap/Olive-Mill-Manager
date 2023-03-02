import {Realm} from '@realm/react';

export class Place extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  placeNumber!: number;
  ownerName!: string;
  numberOfBags!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static generate(
    placeNumber: number,
    ownerName: string,
    numberOfBags: number,
  ) {
    return {
      id: new Realm.BSON.ObjectId(),
      placeNumber,
      ownerName,
      numberOfBags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Place',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      placeNumber: 'int',
      ownerName: 'string',
      numberOfBags: 'int',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
