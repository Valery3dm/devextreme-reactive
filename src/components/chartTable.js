import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from '../data/dataForChart';
import data from '../data/dataForGrid';

export default class ChartTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: ageStructure,
      data1: data
    };
  }

  render() {
    const { data1 } = this.state;

    const sortedDataByCreatedAtValue = data1.sort((a, b) =>
      a.created_at > b.created_at ? 1 
      : b.created_at > a.created_at ? -1 
      : 0
    );

    return (
      <div className="card">
        <Chart
          data={sortedDataByCreatedAtValue}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="created_at"
            argumentField="country"
            name="Young"
          />
          <BarSeries
            valueField="created_at"
            argumentField="country"
            name="Middle"
          />
          <BarSeries
            valueField="created_at"
            argumentField="country"
            name="Older"
          />
          <Stack />
        </Chart>
      </div>
    );
  }
}