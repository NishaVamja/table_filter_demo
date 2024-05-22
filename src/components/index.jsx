import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { DataFilter } from './DataFilter';
import data from '../data.json';

const MainView = () => {
  const [filter, setFilter] = useState({
    city: [],
    category: [],
    type: [],
    active: [],
    name: ''
  });
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let columnsArray = [];
    data.forEach((item) => {
        const keys = Object.keys(item);
        keys.forEach((key) => {
            const index = columnsArray.findIndex((val) => val === key);
            if (index === -1) {
                columnsArray.push(key);
            }
        });
    })
    setColumns(columnsArray);
  }, [data]);

  useEffect(() => {
    const filterData = () => {
      return data.filter((item) => {
        let match = true;
        columns
        .filter((val) => val !== 'id' && val !== 'name')
        .forEach((column) => {
            const tempMatch = filter[column]?.length ? filter[column].includes(item[column]) : true;
            match = match && tempMatch; 
        });
        if (columns.findIndex((val) => val === 'name') > -1) {
            const nameMatch = filter?.name ? item.name?.includes(filter.name) : true;
            return nameMatch && match;
        }
        return match;
      });
    };
    setFilteredData(filterData());
  }, [filter]);

  
  return (
    <div>
      <h1>React Assessment Task</h1>
      <DataFilter
        columns={columns}
        data={data}
        filter={filter}
        setFilter={setFilter}
      />
      <Table
        className='m-30'
        dataSource={filteredData}
        pagination={{ hideOnSinglePage: true }}
        columns={columns.map((name) => ({ title: name.toUpperCase(), dataIndex: name, key: name }))}
      />
    </div>
  );
}

export default MainView;
