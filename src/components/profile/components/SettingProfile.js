import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { Button, Card, Drawer, List, Upload, Image, Divider, Skeleton, Rate, Tabs, Badge } from 'antd';
import { Alert, Modal } from 'antd';
import { Form, Input, Space, Typography, message  } from 'antd';
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
const { Text } = Typography;

const SettingProfile = props => {
    const [formChangePassword] = Form.useForm();
    const [profilePicture, setProfilePicture] = useState({
        url: serverUrl + "/" + props.user.filepath,
        thumbnail: serverUrl + "/" + props.user.filepath_thumbnail,
    })
    const [modalChangePasswordVisible, setModalChangePasswordVisible] = useState(false);
    const [loading, setLoading] = useState({
        isSubmitChangePassword: false
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

    function handleModalChangePassword() {
        if (modalChangePasswordVisible) {
            setModalChangePasswordVisible(false);
        } else {
            setModalChangePasswordVisible(true);
        }
    }

    const onFormFinish = (values) => {
        setLoading({...loading, isSubmitChangePassword: true});
        // var payload = {
        //     id: "",
        //     record_id: props.record_id,
        //     order_number: actions.generateOrderNumber(props.payment_type),
        //     payment_date: null,
        //     payment_type: props.payment_type,
        //     payment_status: 2,
        //     account_name: values.account_name,
        //     account_number: values.account_number,
        //     price: props.price,
        //     unique_number: uniqueNumber
        // }
      
        // axiosApi.post(`/payment/webinarPayment`, payload)
        // .then(res => {
        //     setLoading({...loading, isSubmitLoading: false});
        //     var r = res.data;
        //     if (r.status) {
        //         if (r.data.payment_status === 2) {
        //             window.location.assign("/webinar/payment/pending/" + r.data.id)
        //         }
        //     }
        // });
    }

    return (
        <React.Fragment>
            <Modal 
                title="Ubah Password" 
                centered
                visible={modalChangePasswordVisible}
                onCancel={() => handleModalChangePassword()}
                footer={[
                    <Fragment key="fragment">
                        <p className="f-13 mt-0 mb-1" key="terms" style={{float: "left"}}
                            >Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.
                        </p>
                    </Fragment>
                ]}
                >
                <Alert
                    message={
                        <Fragment>
                            <p className="mb-0" style={{fontWeight: "400"}}>Melakukan penggantian Password harus melengkapi form berikut</p>
                        </Fragment>
                    }
                    type="info"
                    action={
                        <Space>
                            <Image
                                width={70}
                                preview={false} 
                                src={props.payment_type == "transfer_bca" ? "assets/img/bca-icon.png" : ""} 
                            />
                        </Space>
                    }
                />
                <Form 
                    form={formChangePassword}
                    className="mt-3"
                    layout="vertical"
                    onFinish={onFormFinish}
                >
                    <Text style={{fontWeight: "500"}}>Password Lama <span className="text-danger">*</span></Text>
                    <Form.Item
                        name="old_password"
                        className="mb-2"
                        rules={[{ required: true, message: 'Password Lama tidak boleh kosong.' }]}>
                        <Input.Password
                            className="mt-1" 
                            allowClear
                            placeholder="Password Lama" /> 
                    </Form.Item>
                    <Text style={{fontWeight: "500"}}>Password Baru <span className="text-danger">*</span></Text>
                    <Form.Item
                        name="new_password"
                        className="mb-2"
                        rules={[{ required: true, message: 'Password Baru tidak boleh kosong.' }]}>
                        <Input.Password
                            className="mt-1" 
                            allowClear
                            placeholder="Password Baru" /> 
                    </Form.Item>
                    <Text style={{fontWeight: "500"}}>Ulangi Password Baru <span className="text-danger">*</span></Text>
                    <Form.Item
                        name="reenter_new_password"
                        className="mb-2"
                        rules={[{ required: true, message: 'Ulangi Password Baru tidak boleh kosong.' }]}>
                        <Input.Password
                            className="mt-1" 
                            allowClear
                            placeholder="Ulangi Password Baru" /> 
                    </Form.Item>
                    
                    <Button key="pay" type="primary" className="mt-2" htmlType="submit" loading={loading.isSubmitChangePassword} block>Ubah Password</Button>
                </Form >
            </Modal>
            <Skeleton active loading={false} paragraph={{ rows: 5 }}>
                <Card className="borderShadow5 mb-3" size="small">
                    <Image 
                        src={profilePicture.url}
                        preview={false}
                        style={{width: "100%", height: "auto"}} 
                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image-Square.jpg?t=9999"}}
                    />
                    <Upload id="upload" {...uploadProps} style={{width: "100%"}}>
                        <Button className="mt-2" block={true} icon={<UploadOutlined />}>Pilih Foto</Button>
                    </Upload>
                </Card>
                <Button block={true} onClick={setModalChangePasswordVisible}>Ubah Password</Button>
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