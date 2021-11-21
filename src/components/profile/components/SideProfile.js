import React, { useState, useEffect } from 'react'

import { Col } from 'reactstrap';
import NumberFormat from "react-number-format";
import { Card, List, Image } from 'antd';
import serverUrl from '../../../config/serverUrl';
import { connect } from 'react-redux';

const { Meta } = Card;
const SideProfile = props => {
    const [profilePicture, setProfilePicture] = useState({
        url: serverUrl + "/" + props.user.filepath,
        thumbnail: serverUrl + "/" + props.user.filepath_thumbnail,
    })
    useEffect(() => {
    }, [profilePicture]);
    useEffect(() => {
        
    }, []);
    const data = [
        {
            title: 'Riwayat Transaksi',
            url: '/transaction'
        },
        {
            title: 'Daftar Webinar',
            url: '/registration/webinar'
        },
    ];

    return (
        <Card className="borderShadow5 mb-3" size="small">
            <Meta
                avatar={
                    <Image 
                        src={profilePicture.thumbnail}
                        shape="square"
                        preview={false}
                        style={{width: "50px", height: "50px"}}
                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image-Square.jpg?t=9999"}}
                    />
                }
                title={
                    <div className="row mt-0">
                        <Col md="6">
                            <span className="f-18">{props.user.first_name}</span>
                        </Col>
                    </div>
                }
                description={
                    <div style={{marginTop: "-10px"}}>
                        <p className="f-14 mb-0 text-muted">{props.user.title}</p>
                        {/* <p className="f-12 mb-0 text-muted">Verified Account</p> */}

                        {(() => {
                            if (props.user.is_membership) {
                                return (
                                    <span className="badge bg-warning text-dark mr-2 p-1 pr-4 pl-4" style={{ fontWeight: "800" }}>Member</span>

                                )
                            }
                        })()}
                    </div>
                }
            />
            <hr className="mb-3" />
            <div className="row font-weight-bold f-13">
                <div className="col-6">Total Points</div>
                <div className="col-6 text-right">
                    <NumberFormat 
                        value={props.user.total_point}
                        displayType="text"
                        thousandSeparator={true}
                    />
                </div>
            </div>
            <hr className="mb-3" />
            <p className="mb-2 font-weight-bold">Profile Saya</p>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item className="mt-0 mb-0 pt-2 pb-2">
                      <a href={item.url} style={{color: "black"}}>{item.title}</a>
                    </List.Item>
                )}
            />
        </Card>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(SideProfile);