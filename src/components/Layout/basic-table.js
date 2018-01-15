/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';

/**
 * submit the id of the restaurant selected to be saved in the backend
 * @param cell
 * @param row
 * @returns {string}
 */
function buttonFormatter(cell, row) {
  console.log(row);
  return (
    '' +
    '<form>' +
    `<input name="id" type="submit" value=${row.id} formmethod="post">${
      row.id
    }</input>` +
    '</form>'
  );
}

export default class BasicTable extends React.Component {
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
          dataFormat={buttonFormatter}
        />
        <TableHeaderColumn dataField="id" width="10%" hidden />
      </BootstrapTable>
    );
  }
}
