import React, { Fragment, useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Card, Select, Radio, Space } from 'antd';

import * as services from '../services/service';

const { Option, OptGroup } = Select;

export function Filter({handleFilterChange}) {
    const [webinarCategory, setWebinarCategory] = useState([])

    useEffect(() => {
        webinarCategoryLookup("");
    }, []);

    const webinarCategoryLookup = (inputValue) =>
        new Promise((resolve, reject) => {
            services.webinarCategoryLookup(JSON.stringify([inputValue]))
            .then(res => {
                var r = res.data;
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
            }).catch(res => {
                // setisInitLoading(false);
            });
        }); 

    const handleCategoryChange = (value) => {
        var action = "clear";
        if (value !== undefined) {
            action = "filter"
        }
        
        var obj = {
            action: action,
            field: "webinar_category_id",
            value: value,
        }
        handleFilterChange(obj);
    }

    const handleLevelChange = (e) => {
        var obj = {
            action: "filter",
            field: "webinar_level",
            value: e,
        }
        handleFilterChange(obj);
    }


    const options = webinarCategory.map(item => (
        <Fragment key={`fragment-${item.value}`}>
            {item.options && item.options.length > 0 ? (
            <OptGroup label={item.label} key={`optGroup-${item.value}`}>
                {item.options && item.options.length > 0 ? (
                    <>
                        { item.options.map(children => (
                            <Option value={children.value} key={`optGroupValue-${children.value}`}>{children.label}</Option>
                        ))}
                    </>
                ) : null }
            </OptGroup>
            ) : <Option value={item.value} key={`optValue-${item.value}`}>{item.label}</Option>
            }
        </Fragment>
    ));


    return (
        <>
            <h6 className="fw-600 mb-3">Filter</h6>
            <Card size="small">
                <Row>
                    <Col lg="12" className="mb-2">
                        <p className="fw-600 f-14 mb-1">Kategori</p>
                        <Select
                            placeholder="Kategori"
                            className="mr-1 mb-2" 
                            showSearch={false}
                            allowClear={true}
                            onChange={handleCategoryChange}
                            style={{ width: "100%" }}>
                            {options}
                        </Select>
                    </Col>
                    <Col lg="12" className="mb-2">
                        <p className="fw-600 f-14 mb-1">Level</p>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={"Pemula"}  onChange={() => handleLevelChange("Pemula")}>Pemula</Radio>
                                <Radio value={"Lanjutan"} onChange={() => handleLevelChange("Lanjutan")}>Lanjutan</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>
        </>
    )
}