import React from 'react'
import { Drawer, Typography, Spin } from 'antd';
import { Row, Col } from 'reactstrap';
import NumberFormat from "react-number-format";

import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;

export function PricingComponents({isShow, setHide, isLoading, pricings}){

    return (
        <Drawer
            title="Tentukan pilihan yang paling nyaman dengan kantong kamu"
            placement="right"
            className="ops-drawer"
            // width={600}
            onClose={setHide}
            visible={isShow}>
            <Spin indicator={antIcon} spinning={isLoading}>
                <Row>
                    {pricings.map((item, index) => {
                        return  <Col md="6" key={index}>
                                    <div className={`pricing-box borderShadow5 mb-4 ${item.is_default ? "active" : ""}`}>
                                        <div className="price bg-light position-relative p-4 p">
                                            <div className="float-left">
                                                <h5 className="text-dark f-17 title mt-2 fw-600 mb-0">{item.name}</h5>
                                            </div>
                                            <div className="">
                                                <h2 className="text-dark fw-600 text-right mb-0">
                                                    {
                                                        <Text className={`${item.is_default ? "text-white" : "text-dark"}`}>
                                                            <NumberFormat
                                                                value={item.price}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix=""
                                                                />
                                                        </Text>
                                                    }
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className={item.is_default ? "text-white" : "text-dark"}>per bulan</span>
                                            </div>
                                        </div>
                                        <div className="p-4 pricing-list">
                                            <ul className="list-unstyled mb-0">
                                                <li className="text-muted f-14">Durasi {item.duration} Bulan</li>
                                                <li className="text-muted f-14">
                                                    {
                                                        <Text className="text-muted f-14">
                                                            <NumberFormat
                                                                value={item.total_saving == 0 ? "-" : item.total_saving}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix="Hemat Rp "
                                                                />
                                                        </Text>
                                                    }
                                                </li>
                                                <li className="text-muted mb-0 f-14" style={{minHeight: "50px"}}>* {item.description}</li>
                                            </ul>
                                        </div>
                                        <div className="pl-4 pr-4 mb-4 mt-2">
                                            <a href={`/checkout/membership/${item.id}`} className={`btn btn-joran btn-sm btn-block no-radius mt-2 mb-3 ${item.is_active ? "active" : ""}`} >Beli Sekarang</a>
                                        </div>
                                    </div>
                                </Col>
                        })
                    }
                </Row>
            </Spin>
        </Drawer>
    );
}