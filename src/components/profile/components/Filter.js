import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import axiosApi from '../../../config/axiosConfig';
import { Button, Card, Select, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option, OptGroup } = Select;
const { Text } = Typography;

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
        requestEmitenFilter.q = value == undefined ? "" :value;
        this.setState({...this.state, emitenData: []});
        this.emitenLookup();
    }

    handleFilterEmiten = (value) => {
        const { responseFilter } = this.state;
        responseFilter.emiten_id = value == undefined ? "" : value;
    }

    render() {
        var { requestEmitenFilter, emitenData } = this.state
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
                                    <Option value={item.id} label={item.text} key={item.id} >
                                        <div className="demo-option-label-item">
                                            <span className="font-weight-bold" role="img" aria-label={item.text}>{item.text}</span>
                                            <p className="text-muted mb-0 f-12">{item.description}</p>
                                        </div>
                                    </Option>
                                ) 
                            })}
                        </Select>
                    </Col>
                    <Col lg="12" className="mb-2">
                    <Button
                        type="primary"
                        block
                        icon={<SearchOutlined />}
                        // loading={loading[1]}
                        onClick={() => this.props.filtering(this.state)}
                    > Cari
                    </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default Filter;