/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import Link from '../Link';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/plan';
import moment from 'moment';
import Dayz from 'dayz';

const options = {
  onRowClick: function(row) {
    //make a fetch request to google places, get the place, get the images, query for images and display them


  }
};

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.state = {
      startDate: moment(),
      lightboxIsOpen: false,
      currentImage: 0,
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
      <div>
        <BootstrapTable data={this.props.restaurants} hover={true} options={ options }>
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
});

const mapDispatchToProps = dispatch => ({
  addNewEvent: event => {
    dispatch(addEvent(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
