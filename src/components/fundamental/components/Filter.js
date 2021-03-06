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
            loadingEmiten: false,
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
        this.setState({
            ...this.state,
            loadingEmiten: true,
        })
        let { requestEmitenFilter } = this.state;
        axiosApi.post(`/emiten/emitenLookup`, requestEmitenFilter).then(res => {
            var r = res.data;
            this.setState({
                ...this.state,
                loadingEmiten: false,
                emitenData: r.data.results || []});
        });
    }

    handleEmitenSearch = (value) => {
        let { requestEmitenFilter } = this.state;
        requestEmitenFilter.q = value == undefined ? "" :value;
        this.setState({...this.state, emitenData: []});
        this.emitenLookup();
    }

    handleFilterEmiten = (value) => {
        const { responseFilter } = this.state;
        responseFilter.emiten_id = value == undefined ? "" : value;
    }

    render() {
        var { emitenData, loadingEmiten } = this.state
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
                            placeholder={loadingEmiten ? "Loading..." : "Emiten"}
                            onChange={this.handleFilterEmiten}
                            onSearch={this.handleEmitenSearch}
                            onClear={this.handleEmitenSearch}
                            optionLabelProp="label"
                            showSearch={true}
                        >
                            {loadingEmiten ? 
                                <Option value={"123"} disabled={true}>
                                    <p className="text-center text-black mb-0 f-15" style={{color: "black"}}>Loading...</p>
                                </Option>
                            : emitenData.length > 0 && (
                                emitenData.map((item, i) => {     
                                    return (
                                        <Option value={item.value} label={item.label} key={`option-${item.value}`} >
                                            <div className="demo-option-label-item">
                                                <span aria-label={item.label}>{item.label}</span>
                                                <p className="text-muted mb-0 f-12">{item.description}</p>
                                            </div>
                                        </Option>
                                    ) 
                                })
                            )}
                        </Select>
                    </Col>
                    <Col lg="12" className="mb-2">
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