import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import axiosApi from '../../../config/axiosConfig';
import { Button, Card, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            responseFilter: {
                signal: "",
                timeframe: "",
                emiten_id: "",
            },
            emitenData: [],
            requestEmitenFilter: {
                q: "", // search term
                page: 1,
                size: 10,
                field: ["emiten_name", "emiten_code"]
            }
        };
    }

    componentDidMount() {
        this.emitenLookup();
    }

    emitenLookup = () => {
        let { requestEmitenFilter } = this.state;
        axiosApi.post(`/emiten/emitenLookup`, requestEmitenFilter).then(res => {
            var r = res.data;
            if (r.data.results.length > 0) {
                this.setState({...this.state, emitenData: r.data.results});
            } else {
                this.setState({...this.state, emitenData: []});
            }
        });
    }

    handleEmitenSearch = (value) => {
        let { requestEmitenFilter } = this.state;
        requestEmitenFilter.q = value === undefined ? "" :value;
        this.setState({...this.state, emitenData: []});
        this.emitenLookup();
    }

    handleFilterEmiten = (value) => {
        const { responseFilter } = this.state;
        responseFilter.emiten_id = value === undefined ? "" : value;
    }

    handleFilterSignal = (value) => {
        const { responseFilter } = this.state;
        responseFilter.signal = value === undefined ? "" : value;
    }

    handleFilterTimeframe = (value) => {
        const { responseFilter } = this.state;
        responseFilter.timeframe = value === undefined ? "" : value;
    }

    render() {
        var { emitenData } = this.state
        return (
            <Card size="small" title="Filter" className="borderShadow5">
                <Row>
                    <Col lg="12" className="mb-2">
                        <p className="font-weight-bold f-14 mb-1">Emiten</p>
                        <Select
                            //mode="multiple"
                            showSearch
                            allowClear
                            // showSearch="true"
                            filterOption={false}
                            defaultOpen={false}
                            bordered={true}
                            style={{ width: '100%' }}
                            placeholder="Pilih Emiten"
                            onChange={this.handleFilterEmiten}
                            onSearch={this.handleEmitenSearch}
                            onClear={this.handleEmitenSearch}
                            optionLabelProp="label"
                        >
                            {emitenData.map((item, i) => {     
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
                        <p className="font-weight-bold f-14 mb-1">Signal</p>
                        <Select className="mr-1 filter-form" 
                            showSearch
                            allowClear
                            placeholder="Pilih Signal"
                            onChange={this.handleFilterSignal}>
                            <Option value="Netral">Netral</Option>
                            <Option value="Downtrend">Downtrend</Option>
                            <Option value="Uptrend">Uptrend</Option>
                        </Select>
                    </Col>
                    <Col lg="12" className="mb-2">
                        <p className="font-weight-bold f-14 mb-1">Timeframe</p>
                        <Select className="mr-1 filter-form" 
                            showSearch
                            allowClear
                            placeholder="Pilih Timeframe"
                            onChange={this.handleFilterTimeframe}
                            >
                            <Option value="One Day Trade">One Day Trade</Option>
                            <Option value="Swing">Swing</Option>
                        </Select>
                    </Col>
                    <Col lg="12">
                        <button
                            className="btn btn-joran btn-block btn-sm no-radius mt-1"
                            onClick={() => this.props.filtering(this.state)}> Cari
                        </button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default Filter;