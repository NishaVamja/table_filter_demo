import React, { Fragment } from 'react';
import { Switch, Divider, Input } from 'antd';

export const DataFilter = ({ columns, data, filter, setFilter }) => {
    const onChangeSwitch = (type, data, checked) => {
        let filterObj = { ...filter };
        const existData = filterObj[type] || [];
        const index = existData.findIndex((val) => val === data);
        if (checked) {
            if (index === -1) {
                existData.push(data);    
            }
        } else {
            if (index > -1) {
                existData.splice(index, 1);
            }
        }
        filterObj = { ...filterObj, [type]: existData };
        setFilter(filterObj);
    }

    const onChangeName = (e) => {
        const name = e.target.value.trim();
        setFilter((prev) => ({ ...prev, name }));
    }

    return (
        <div>
            <div className="filter flex">
                {columns
                .filter((val) => val !== 'id' && val !== 'name')
                .map((val, i) => {
                    const options = (Object.keys(Object.groupBy(data, (item) => item[val]))).filter((data) => data !== 'undefined');
                    return (
                        <Fragment key={i}>
                            {i !== 0 ? <Divider type="vertical" className='divider'/> : null}
                            <div className='flex'>
                                <label>{val.toUpperCase()}:</label>
                                <div className='column'>
                                    {options.map ((data, i) => (
                                        <div key={i} className='flex'>
                                            <Switch className='mr-5' onChange={(check) => onChangeSwitch(val, data, check)}/>
                                            {data}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
                {columns.findIndex((val) => val === 'name') > -1 ? (
                    <Fragment>
                        <Divider type="vertical" className='divider'/>
                        <div className='flex'>
                            <label>Name:</label>
                            <Input className='input' onChange={onChangeName}/>
                        </div>
                    </Fragment>
                ) : null}
            </div>
        </div>
    );
}
