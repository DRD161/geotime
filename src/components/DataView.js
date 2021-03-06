import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import * as moment from 'moment';
import * as global from '../global';
import 'antd/dist/antd.css';

export default class DataView extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getFootprintsData();
  }

  getFootprintsData = () => {
    axios({
      method: 'get',
      url: global.API_URL + '/getfootprints',
      headers: global.JSON_TYPE,
    }).then((data) => {
      return this.setState({ data: data.data });
    });
  };

  render() {
    const dataSource = this.state.data.map((footprint, idx) => {
      return {
        key: idx,
        case_id: footprint.case_id,
        date: moment(footprint.date).format('ddd, ll'),
        time: footprint.time,
        latitude: footprint.latitude,
        longitude: footprint.longitude,
      };
    });
    const columns = [
      { title: 'case_id', dataIndex: 'case_id' },
      { title: 'date', dataIndex: 'date' },
      { title: 'time', dataIndex: 'time' },
      { title: 'latitude', dataIndex: 'latitude' },
      { title: 'longitude', dataIndex: 'longitude' },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={true}
        className="table-column"
        size="large"
      />
    );
  }
}
