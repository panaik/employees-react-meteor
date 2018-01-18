import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

// const EmployeeList = props => {
// Was a Functioal component, but switched to Class when we wanted to add more employees on Load More button click

// Functional component is a one-shot, here are some props, get some JSX back, absolutely no persistence of any data
// If we want any king of persistence or any data gets updated or changed over time, we need a Class based component

class EmployeeList extends Component {
  // this.pros.employees => array of employee objects
  //console.log(this.props.employees);
  // must see 20 records only as server publication is for first 20 records only (PER_PAGE = 20)

  componentWillMount() {
    this.page = 1;
  }

  // here we are not using this.state to re-render the component
  // because we want to render this component only when the subscription changes,
  // which happens on Load More button click

  handleButtonClick() {
    // (this.page + 1) -> already incrementing by one because we have already fetched the first 20 records
    // in the subscription definition below;
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee => (
            <EmployeeDetail key={employee._id} employee={employee} />
          ))}
        </div>
        <button
          onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary"
        >
          Load More...
        </button>
      </div>
    );
  }
}

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
