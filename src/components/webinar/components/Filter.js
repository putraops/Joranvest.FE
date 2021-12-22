import React, { useState, useEffect, Fragment } from 'react';
import 'antd/dist/antd.css';

import axiosApi from '../../../config/axiosConfig';
import { Select} from 'antd';


const { Option, OptGroup } = Select;

const Filter = props => {
    const [webinarCategory, setWebinarCategory] = useState([])

    useEffect(() => {
        webinarCategoryLookup("");
    }, []);

    const webinarCategoryLookup = (inputValue) =>
        new Promise((resolve, reject) => {
            axiosApi.get(`/webinar_category/lookup?q=&page=1&field=${JSON.stringify(["name"])}`)
            .then(res => {
                var r = res.data;
                console.log(r);
                const data = [];
                if (r.status) {
                    if (r.data.results.length > 0) {
                        r.data.results.forEach((items) => {
                            if (items.children.length > 0) {
                                var aryChildren = [];
                                items.children.forEach((children) => {
                                    aryChildren.push({
                                        value: children.id,
                                        label: children.text
                                    })
                                });
                                data.push({
                                    value: items.id,
                                    label: items.text,
                                    options: aryChildren
                                })
                            } else {
                                data.push({
                                    value: items.id,
                                    label: items.text
                                })
                            }
                        });
                    }
                }
                setWebinarCategory(data);

                if (r.status) {
                    resolve(data);
                } else {
                    reject(false);
                }
            });
        }); 

    const options = webinarCategory.map(item => (
        <Fragment key={`fragment-${item.value}`}>
            {item.options && item.options.length > 0 ? (
            <OptGroup label={item.label} key={`optGroup-${item.value}`}>
                {item.options && item.options.length > 0 ? (
                    <Fragment>
                        { item.options.map(children => (
                            <Option value={children.value} key={`optGroupValue-${children.value}`}>{children.label}</Option>
                        ))}
                    </Fragment>
                ) : null }
            </OptGroup>
            ) : <Option value={item.value} key={`optValue-${item.value}`}>{item.label}</Option>
            }
        </Fragment>
    ));

    return (
        <React.Fragment>
            <strong>Pencarian: </strong>
                <Select
                    placeholder="Kategori"
                    className="mr-1" 
                    showSearch={true}
                    allowClear={true}
                    style={{ width: 200 }}
                    onChange={props.webinarCategoryChange}
                >
                    {options}
                </Select>
                <Select
                    placeholder="Urutkan"
                    defaultValue="newest"
                    className="mr-1" 
                    style={{ width: 200 }}
                    onChange={props.handleOrder}
                >
                    <Option value="newest">Webinar Terdekat</Option>
                    {/* <Option value="newest">Terbaru</Option>
                    <Option value="popularity">Popularitas</Option> */}
                    <Option value="lowest_price">Harga Terendah</Option>
                    <Option value="highest_price">Harga Tertinggi</Option>
                </Select>
                <hr />
        </React.Fragment>
    );
}
export default (Filter);