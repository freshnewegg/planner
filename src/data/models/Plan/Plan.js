/**
 * Edgar Wang, Jan 6 2018
 */

import DataType from 'sequelize';
import Model from '../../sequelize';

const Plan = Model.define(
  'Plan',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    city: {
      type: DataType.STRING(255),
    },

    date: {
      type: DataType.DATEONLY,
    },

    permalink: {
      type: DataType.STRING(255),
      validate: { isUrl: true },
    },
  },
  {
    indexes: [{ fields: ['city'] }],
  },
);

export default Plan;
