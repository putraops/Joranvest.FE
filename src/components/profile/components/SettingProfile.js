import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { Button, Card, Drawer, List, Upload, Image, Divider, Skeleton, Rate, Tabs, Badge } from 'antd';
import { Dropdown, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import sideNotification from '../../../commons/sideNotification'
import serverUrl from '../../../config/serverUrl';
import baseUrl from '../../../config/baseUrl';
import axiosApi from '../../../config/axiosConfig'
import joranCookies from '../../../commons/joranCookies';
import '../css/style.css'

const { Meta } = Card;

const SettingProfile = props => {
    console.log(props.user);
    const [profilePicture, setProfilePicture] = useState({
        url: serverUrl + "/" + props.user.filepath,
        thumbnail: serverUrl + "/" + props.user.filepath_thumbnail,
    })
    useEffect(() => {
    }, [profilePicture]);

    const uploadProps = {
        onChange(info) {
            if (info.file.status === 'removed') {
                //alert();
            } else {
                if (info.file.status !== 'uploading') {
                    handleChangeUpload(info);
                } 
            }
        },
        showUploadList: false,
    };

    const handleChangeUpload = info => {
        console.log("handleChangeUpload: ", info)
        var formData = new FormData();
        formData.append("file", info.file.originFileObj);
        axiosApi.post(`/filemaster/uploadProfilePicture/${props.user.id}`, formData)
        .then(res => {
            var r = res.data;
            if (r.status) {
                sideNotification.open("Berhasil", "Foto Profil telah diubah", true);
                setProfilePicture({
                    url: serverUrl + "/" + r.data.filepath,
                    thumbnail: serverUrl + "/" + r.data.filepath_thumbnail
                })
                
                var oldCookies = props.user;
                oldCookies.filepath = r.data.filepath;
                oldCookies.filepath_thumbnail = r.data.filepath_thumbnail;
                joranCookies.set(oldCookies);
                
                setTimeout(function(){ window.location.assign(baseUrl + "/profile"); }, 1000);
            } else {
                
                sideNotification.open("Gagal!", r.message, false);
            }
        });
    };

    return (
        <React.Fragment>
            <Skeleton active loading={false} paragraph={{ rows: 5 }}>
                <Card className="borderShadow5 mb-3" size="small">
                    <Image 
                        src={profilePicture.url}
                        preview={false}
                        style={{width: "100%", height: "auto"}} 
                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image-Square.jpg?t=9999"}}
                    />
                    <Upload id="upload" {...uploadProps} style={{width: "100%"}}>
                        <Button className="mt-2" block={true} icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Card>
                <Button block={true}>Ubah Password</Button>
            </Skeleton>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        parent: state.parentRecord,
    }
}
export default connect(mapStateToProps, null)(SettingProfile);