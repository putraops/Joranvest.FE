import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
// import axiosApi from '../../../config/axiosConfig';
import { Card, Select, Radio, Space } from 'antd';

import * as services from '../services/service';

const { Option } = Select;

export function Filter({user, handleFilterChange}) {
    const [categoryData, setCategoryData] = useState([]);
    const [emitenCategoryPayload, setEmitenCategoryPayload] = useState({
            q: "", // search term
            page: 1,
            size: 10,
            field: ["name"]
        }
    )

    useEffect(() => {
        educationCategoryLookup();
    }, []);

    const educationCategoryLookup = () => {
        services.emitenCategoryLookup(emitenCategoryPayload)
        .then(res => {
            var r = res.data;
            if (r.status) {
                if (r.data.results.length > 0) {
                    // this.setState({...this.state, emitenData: r.data.results});
                    setCategoryData(r.data.results);
                }
            }
        }).catch(res => {
            //setLoading({...loading, isContentLoading: false});
        });
    }

    const handleCategoryChange = (value) => {
        var action = "clear";
        if (value !== undefined) {
            action = "filter"
        }
        
        var obj = {
            action: action,
            field: "education_category_id",
            value: value,
        }
        handleFilterChange(obj);
    }

    const handleLevelChange = (e) => {
        var obj = {
            action: "filter",
            field: "level",
            value: e,
        }
        handleFilterChange(obj);
    }

    return (
        <>
            <h6 className="fw-600 mb-3">Filter</h6>
            <Card size="small">
                <Row>
                    <Col lg="12" className="mb-2">
                        <p className="fw-600 f-14 mb-1">Kategori</p>
                        <Select
                            showSearch={false}
                            allowClear
                            filterOption={false}
                            defaultOpen={false}
                            bordered={true}
                            style={{ width: '100%' }}
                            placeholder="Pilih Kategori"
                            onChange={handleCategoryChange}
                            // onSearch={this.handleEmitenSearch}
                            // onClear={this.handleEmitenSearch}
                            optionLabelProp="label">
                            {categoryData.map((item, i) => {     
                                return (
                                    <Option value={item.value} label={item.label} key={`option-${item.value}`} >
                                        <div className="demo-option-label-item">
                                            <span aria-label={item.label}>{item.label}</span>
                                            <p className="text-muted mb-0 f-12">{item.description}</p>
                                        </div>
                                    </Option>
                                ) 
                            })}
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
                    {/* <Col lg="12">
                        <button
                            className="btn btn-joran btn-block btn-sm no-radius mt-1"
                            onClick={() => alert()}> Cari
                        </button>
                    </Col> */}
                </Row>
            </Card>
        </>
    )
}