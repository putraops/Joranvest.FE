import React, { Fragment } from 'react';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { Button, Card, Drawer, List, Avatar, Divider, Skeleton, Rate, Tabs, Badge } from 'antd';
import { Dropdown, Menu } from 'antd';
import { PoweroffOutlined, DownloadOutlined, UserOutlined, DashOutlined} from '@ant-design/icons';

const { Meta } = Card;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFilter: [],
            listData: {total:0,data:[]}
        };
    }

    render() {
        const { user } = this.props;
        
        const menu = (
            <Menu>
                <Menu.Item key="change-profile">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Ubah Profile
                    </a>
                </Menu.Item>
                <Menu.Item key="change-password">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Ubah Password
                    </a>
                </Menu.Item>
            </Menu>
          );

        return (
            <React.Fragment>
                <Skeleton active loading={this.props.isLoading} avatar paragraph={{ rows: 5 }}>
                    <Card className="borderShadow5 mt-3 mb-3" size="small" extra={
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button id="btn-more"icon={<DashOutlined />} />
                        </Dropdown>
                    }>
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" shape="square" style={{width: "120px", height: "120px"}} />}
                        title={
                            
                            <div className="row mt-0">
                                <Col md="6">
                                    <span className="f-18">{user.first_name} {user.last_name}</span>
                                </Col>
                                <Col md="6" className="text-right">
                                    <Badge className="site-badge-count-109 mr-2" 
                                        count={
                                                <NumberFormat 
                                                    value={user.total_point}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix="Total Point "
                                                />
                                            } 
                                        style={{ backgroundColor: '#d9d9d9', color: "black", fontWeight: "700", fontSize: "13px", padding: "5px 10px 6px 10px", borderRadius: "50px" }} 
                                    />
                                </Col>
                            </div>
                        }
                        description={
                            <div style={{marginTop: "-10px"}}>
                                <p className="f-14 mb-0 text-muted">{user.title}</p>
                                <p className="f-12 mb-0 text-muted">Verified Account</p>
                                
                                {(() => {
                                    if (user.has_role) {
                                        return (
                                            <div className="mb-2 mt-0">
                                                <Rate allowHalf disabled defaultValue={4.5} className="mr-2" /> <strong>(142 Ulasan)</strong> 
                                            </div>
                                        )
                                    } 
                                })()}

                                {(() => {
                                    if (user.is_membership) {
                                        return (
                                            <span className="badge bg-warning text-dark mr-2 p-1 pr-4 pl-4" style={{ fontWeight: "800" }}>Member</span>

                                        )
                                    }
                                })()}
                            </div>
                        }
                    />
                    </Card>
                </Skeleton>
            </React.Fragment>
        );
    }
}

export default Main;