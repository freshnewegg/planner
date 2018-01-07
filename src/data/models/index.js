/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './Users/User';
import UserLogin from './Users/UserLogin';
import UserClaim from './Users/UserClaim';
import UserProfile from './Users/UserProfile';
import Plan from './Plan/Plan';
import FoodActivity from './Plan/FoodActivity';
import ToDoActivity from './Plan/ToDoActivity';

/**
 * Set up user relationships
 */
User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/**
 * Set up Plan relationships
 */
Plan.hasMany(FoodActivity, {
  foreignKey: 'planId',
  as: 'foodactivities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Plan.hasMany(ToDoActivity, {
  foreignKey: 'planId',
  as: 'todoactivities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile };
