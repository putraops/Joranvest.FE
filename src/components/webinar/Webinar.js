import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Image } from 'antd';
import { Button, Card, Drawer, Badge, List, Avatar, Divider, IconText, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Space } from 'antd';

const { Option, OptGroup } = Select;
const { Meta } = Card;

class Webinar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 10,
            },
            user: {
                name: "",
            },
            listData: {total:0,data:[]}
        };
    }

    componentDidMount () {
        const { payload } = this.state;
        this.LoadData();
    }

    LoadData = () =>
    {
        const {payload} = this.state; 
        axiosApi.post(`/technical_analysis/getPagination`, payload).then(r => {
            console.log(r.data);
            if (r.data.total > 0) {
                    this.setState({...this.state, listData:r.data});
                }
        });
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }
    
    render() {
        const { listData, payload } = this.state;
        const gridAnalysis = {
            left: 0,
            right: 0,
            // margin: '0 0px',
            padding: '15px',
            WebkitBoxShadow: '0 0 5px 0px rgb(0 0 0 / 15%)',
            boxShadow: '0 0 5px 0px rgb(0 0 0 / 15%)',
            borderRadius: '0px',
            top: '-25px',
            WebkitTransition: 'all 0.5s',
            transition: 'all 0.5s'
        }
        
        const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
        );
      
        return (
            <React.Fragment>
                <Navbar />
                <section className="section home-1-bg" id="home">
                    <div className="container mt-5">
                        <Row className="">
                            <Col md="12">
                            <strong className="mb-2 f-18">Semua Webinar</strong>
					        <p>Filter: 
                                <Select defaultValue="lucy" style={{ width: 200 }}>
                                    <Option value="jack">Semua Kategori</Option>
                                    <OptGroup label="Manager">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </OptGroup>
                                    <OptGroup label="Engineer">
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </OptGroup>
                                </Select>
                            </p>
                            
                            </Col>
                            <Col md="12">
                                <List
                                    itemLayout="vertical"  size="large"
                                    pagination={{
                                    onChange: page => {
                                        this.handlePage(page);
                                    },
                                    pageSize: payload.size,
                                    total: listData.total
                                    }}
                                    dataSource={listData.data}
                                    // footer={}
                                    renderItem={item => (
                                    <List.Item className="p-0 mb-2 border-bottom-0"
                                        key={item.id}
                                        actions={[
                                        ]}>
                                        <Badge.Ribbon text="Gratis" color="green">
                                            <a href="/webinar/4123123">
                                                <Card size="small">
                                                    <List.Item.Meta className="mb-0"
                                                        avatar={
                                                            <Image
                                                                width={150}
                                                                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?4123`}
                                                                placeholder={
                                                                <Image
                                                                    preview={false}
                                                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                                                    width={150}
                                                                />
                                                                }
                                                            />
                                                        }
                                                        title={
                                                            <div style={{marginTop: "-5px", marginBottom: "-10px"}}>
                                                                <p className="f-15 mb-0">{item.user_create}</p>
                                                                <div>
                                                                    <Tag className="mr-1" color="#531dab">Webinar</Tag>
                                                                    <Tag className="mr-1" color="#2db7f5">Pemula</Tag>
                                                                    <Tag className="mr-1" color="#87d068">Bersertifikat</Tag>
                                                                </div>
                                                                <span className="f-13 text-muted">Kamis, 13 September 2021</span>
                                                            </div>
                                                        }
                                                        description={
                                                            <div className="row">
                                                                <div className= "col-md-12">
                                                                    <Meta style={{marginTop: "7px"}}
                                                                        avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>}
                                                                        title={
                                                                            <div style={{marginTop: "-5px"}}>
                                                                                <span className="f-14">Nelly Mathias</span>
                                                                            </div>
                                                                        }
                                                                        description={
                                                                            <div style={{marginTop: "-12px"}}>
                                                                                <span className="f-13 text-muted">Professional Fasilisator</span>
                                                                            </div>
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-2">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                                </div>
                                                            </div>
                                                        } />
                                                    {
                                                    }
                                                </Card>
                                            </a>
                                        </Badge.Ribbon>
                                    </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default Webinar;