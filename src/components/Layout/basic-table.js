/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import Link from '../Link';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/plan';
import moment from 'moment';
import Dayz from 'dayz';

// /**
//  * submit the id of the restaurant selected to be saved in the backend
//  * @param cell
//  * @param row
//  * @returns {string}
//  */
// function buttonFormatter(cell, row) {
//   console.log(row);
//   return (
//     <div><Link to="/" onClick={this.addEvent(row)}><button>{row.id}</button></Link></div>
//
//   );
// }

// does a post request to server
// function buttonFormatter(cell, row) {
//   console.log(row);
//   return (
//     '' +
//     '<form>' +
//     `<input name="id" type="submit" value=${row.id} formmethod="post">${
//       row.id
//     }</input>` +
//     '</form>'
//   );
// }

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.state = {
      startDate: moment(),
    };
  }

  buttonFormatter(cell, row) {
    return (
      <div>
        <Link to="/" onClick={() => this.addEvent(row)}>
          <button>{row.id}</button>
        </Link>
      </div>
    );
  }

  /**
   * adds
   */
  addEvent(row) {
    console.log('ADDING');
    this.props.addNewEvent({
      content: row.name,
      resizable: { step: 15 },
      range: moment.range(
        this.state.startDate.clone().add(8, 'hour'),
        this.state.startDate.clone().add(9, 'hour'),
      ),
    });
  }

  render() {
    return (
      <BootstrapTable data={this.props.restaurants}>
        <TableHeaderColumn dataField="name" isKey width="15%">
          Restaurant Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="type"
          width="20%"
          tdStyle={{ whiteSpace: 'normal' }}
        >
          Type
        </TableHeaderColumn>
        <TableHeaderColumn dataField="rating" width="10%">
          Avg Rating
        </TableHeaderColumn>
        <TableHeaderColumn dataField="price" width="10%">
          Price
        </TableHeaderColumn>
        <TableHeaderColumn dataField="address" width="10%">
          Address
        </TableHeaderColumn>
        <TableHeaderColumn dataField="hours" width="10%">
          Hours Open
        </TableHeaderColumn>
        <TableHeaderColumn dataField="website" width="15%">
          Website
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="add"
          width="10%"
          dataFormat={this.buttonFormatter}
        />
        <TableHeaderColumn dataField="id" width="10%" hidden />
      </BootstrapTable>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  addNewEvent: event => {
    dispatch(addEvent(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
