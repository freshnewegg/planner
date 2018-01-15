/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import FoodList from './FoodList';
import Layout from '../../components/Layout';
import nodeFetch from 'node-fetch';

function action(context) {
  return {
    chunks: ['home'],
    title: 'Food List',
    component: (
      <Layout>
        <FoodList params={context} />
      </Layout>
    ),
  };
}

export default action;
