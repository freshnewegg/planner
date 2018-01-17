/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import Link from '../Link';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/plan';
import moment from 'moment';
import Dayz from 'dayz';
import { setLightboxStatus, setSelectedActivity } from '../../actions/lightbox';

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
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

  onSelectRow(row) {
    alert(`You click row id: ${row.id}`);
    this.props.setLightBoxStatus(true);
    this.props.selectActivity(`${row.name}+${row.address}`);
  }

  render() {
    const options = {
      onRowClick: this.onSelectRow,
    };

    return (
      <div>
        <BootstrapTable data={this.props.restaurants} hover options={options}>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  lightboxOpen: state.lightbox.lightboxOpen,
});

const mapDispatchToProps = dispatch => ({
  addNewEvent: event => {
    dispatch(addEvent(event));
  },
  setLightBoxStatus: status => {
    dispatch(setLightboxStatus(status));
  },
  selectActivity: activity => {
    dispatch(setSelectedActivity(activity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
