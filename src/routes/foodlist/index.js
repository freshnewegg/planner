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

function action() {
  return {
    chunks: ['foodlist'],
    title: 'Food List',
    component: (
      <Layout>
        <FoodList />
      </Layout>
    ),
  };
}

export default action;
