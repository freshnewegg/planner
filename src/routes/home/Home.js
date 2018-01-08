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
import s from './Home.css';
import Dayz from 'dayz';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import picker_style from 'react-datepicker/dist/react-datepicker.css';
import dayz_style from 'dayz/dist/dayz.css';
import Link from '../../components/Link';

class Home extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      events: new Dayz.EventsCollection([
        { content: 'Continuing event Past',
          range: moment.range(moment('2015-09-08'), moment('2015-09-14')) },

        { content: 'Continuing event Before',
          range: moment.range('2015-09-04', '2015-09-09') },

        { content: 'Weeklong',
          range: moment.range('2015-09-06', moment('2015-09-12').endOf('day')) },

        { content: 'A Longer Event',
          range: moment.range(moment('2015-09-04'), moment('2015-09-14')) },

        { content: 'Inclusive',
          range: moment.range(moment('2015-09-07'), moment('2015-09-12')) },

        { content: '9am - 2pm (resizable)',
          resizable: { step: 15 },
          range: moment.range(moment('2015-09-11').hour(9),
            moment('2015-09-11').hour(14)) },

        { content: '8am - 8pm (non-resizable)',
          range: moment.range(moment('2015-09-07').hour(8),
            moment('2015-09-07').hour(20)) },
      ]),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,

    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Your Current Plan</h1>
          <div className={s.action_bar_wrapper}>
            <div>Permalink: www.fake.com</div>
            <div className={s.action_bar_wrapper}>
              <div className={s.date_text}>Date:</div>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>
            <div>Weather</div>
          </div>
          <div className={s.action_bar_wrapper}>
            <Link to="/food/breakfast">
              <button type="button">
                Add Food
              </button>
            </Link>
          </div>
        </div>
        <div className={s.timeline}>
            <Dayz
            display='day'
            date={this.state.startDate}
            events={this.state.events}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(dayz_style, picker_style, s)(Home);
