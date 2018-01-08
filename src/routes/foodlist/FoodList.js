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

class FoodList extends React.Component {
  static propTypes = {};

  url = "https://api.yelp.com/v3/businesses/search?term=";

  render() {
    return (
      <div className={s.root}>
        <div className={s.container} >
          <h1>Choose Breakfast</h1>
          <Map/>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FoodList);
