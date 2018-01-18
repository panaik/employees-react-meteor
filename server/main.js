// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // this is because we don't want to generate data every time the server runns
  // to do so we have to query the collection to check for data existence
  // See if the collection has any records
  const numberRecords = Employees.find({}).count(); // returns number of records saved in Employees collection
  console.log('numberRecords', numberRecords);
  if (!numberRecords) {
    // Generate some data...
    // _.times will execute the arrow function 5000 times in this case
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name,
        email,
        phone,
        avatar: image.avatar()
      });
    });
  }

  // employees - name of the publication here
  Meteor.publish('employees', function(per_page) {
    // Employees.find({}) is just a bookmark and returns a 'Cursor'
    // it does not actually return the entire collection
    // limit: 20, returns first 20 records
    return Employees.find({}, { limit: per_page });
  });
});
