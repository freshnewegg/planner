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
    this.state = {};
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
    // find first opening in the day however short it is max 1 hour
    // find the last event in the day and stick new 1 to end of it if its within the day
    let end = 8;
    console.log(this.props.events);
    for (let i = 0; i < this.props.events.length; i++) {
      end = Math.max(
        end,
        new moment(this.props.events[i].range.end).get('hour'),
      );
    }

    console.log('END');
    console.log(end);

    this.props.addNewEvent({
      content: row.name.concat(
        ' | ',
        row.type,
        ' | ',
        row.rating,
        ' | ',
        row.price,
        ' | ',
        row.address,
      ),
      id: row.id,
      searchTerm: row.name.concat(' ', row.address).replace(/ /g, '+'),
      resizable: { step: 15 },
      range: moment.range(
        this.props.selected_time
          .clone()
          .startOf('day')
          .add(end, 'hour'),
        this.props.selected_time
          .clone()
          .startOf('day')
          .add(end + 1 < 24 ? end + 1 : end, 'hour'),
      ),
    });
  }

  onSelectRow(row, col) {
    // TODO: make dis not # of columns
    if (col < 7) {
      this.props.setLightBoxStatus(true);
      this.props.selectActivity(`${row.name}+${row.address}`);
    }
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
  events: state.plan.events,
  lightboxOpen: state.lightbox.lightboxOpen,
  selected_time: moment(state.plan.time),
});

const mapDispatchToProps = dispatch => ({
  addNewEvent: event => {
    dispatch(addEvent(event));
  },
  setLightBoxStatus: status => {
    dispatch(setLightboxStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
