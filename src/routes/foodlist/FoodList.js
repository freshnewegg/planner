/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FoodList.css';
import Map from '../../components/Map/map';
import tablecss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import BasicTable from '../../components/Layout/basic-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Col, Panel } from 'react-bootstrap';

class FoodList extends React.Component {
  static propTypes = {};

  render() {
    // console.log("REST")
    console.log(this.props.restaurants);
    const places = [];
    if (this.props.restaurants) {
      for (let i = 0; i < this.props.restaurants.businesses.length; i++) {
        const place = this.props.restaurants.businesses[i];
        const types = place.categories.map(alias => alias.title);
        places.push({
          name: place.name,
          type: types.join(),
          rating: place.rating,
          price: place.price,
          address: place.location.address1,
          hours: place.is_closed ? 'Closed' : 'Open',
          website: place.url,
          id: place.id,
        });
      }
    }

    // <table id={s.customers}>
    //   <tbody>
    //     <tr>
    //       <th>Restaurant</th>
    //       <th>type</th>
    //       <th>average rating</th>
    //       <th>price range</th>
    //       <th>address</th>
    //       <th>Open Right Now?</th>
    //       <th>website</th>
    //     </tr>
    //     {[1,2,3].map((num) => {
    // {/*<tr>*/}
    // {/*<td>{num}</td>*/}
    // {/*</tr>*/}
    // {/*})}*/}
    // {/*</tbody>*/}
    // {/*</table>*/}

    // console.log(places.length);

    // let products = [{
    //   id: 1,
    //   name: "Product1",
    //   price: 120
    // }, {
    //   id: 2,
    //   name: "Product2",
    //   price: 80
    // }];
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Filter by area</h1>
          <Map />
          <h1>Choose Breakfast</h1>
          <Col md={15}>
            <Panel header="A basic react-bootstrap-table">
              <BasicTable restaurants={places} />
            </Panel>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location_lat: state.map.location ? state.map.location.lat : null,
  restaurants: state.restaurants,
});

export default connect(mapStateToProps)(withStyles(s, tablecss)(FoodList));
