/**
 * Edgar Wang, Jan 6 2018
 */

import DataType from 'sequelize';
import Model from '../../sequelize';

const FoodActivity = Model.define(
  'FoodActivity',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    start_time: {
      type: DataType.TIME,
    },

    end_time: {
      type: DataType.TIME,
    },

    name: {
      type: DataType.STRING(255),
    },

    restaurant_type: {
      type: DataType.STRING(255),
    },

    price_range: {
      type: DataType.STRING(255),
    },

    address: {
      type: DataType.STRING(255),
    },

    avg_rating: {
      type: DataType.STRING(10),
    },
  },
  {
    indexes: [{ fields: ['name'] }],
  },
);

export default FoodActivity;
