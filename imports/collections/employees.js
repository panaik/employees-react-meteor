// Declare our collection
import { Mongo } from 'meteor/mongo';

// name of the collection is 'employees'
export const Employees = new Mongo.Collection('employees');
