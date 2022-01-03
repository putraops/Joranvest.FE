import React, { Fragment, useState } from 'react';
import { 
    Button, Card, Upload, Image, Skeleton,
    Alert, Modal, Form, Input, InputNumber, Space, 
    Tag, Typography
} from 'antd';
import { Row, Col } from 'reactstrap';
import SettingProfile from './SettingProfile';
import { connect } from 'react-redux'
import axiosApi from '../../../config/axiosConfig'
import sideNotification from '../../../commons/sideNotification';

const { Meta } = Card;
const { Text } = Typography;
const InformationTab = props => {
    const [loading, setLoading] = useState({
        isSubmitLoading: false
    })

    const [userRecord, setUserRecord] = useState(props.user);
    const [isModalShow, setIsModalShow] = useState(false);
    const [payload, setPayload] = useState({
        id: props.user.id,
        phone: props.user.phone
    });

    const handleChange = (event) => {
        const target = event.target;
        setPayload({
            ...payload,
            phone: target.value
        })
    }

    const handleSubmit = () => {
        setLoading({...loading, isSubmitLoading: true});
        axiosApi.post(`/application_user/changePhone`, payload)
        .then(res => {
            setLoading({...loading, isSubmitLoading: false});
            var r = res.data;
            if (r.status) {
                sideNotification.open("Berhasil", "No Hp telah diubah.", true);
                setUserRecord({
                    ...userRecord,
                    phone: payload.phone
                });
                setIsModalShow(false);
            } else {
                sideNotification.open("Gagal!", "Gagal mengubah No Hp.", false);
            }
        }).catch(error => {
            console.log(error);
        });
    }


    return (
        <Fragment>
            <Modal 
                // title="Ubah Password" 
                className='p-0'
                centered
                visible={isModalShow}
                onCancel={() => setIsModalShow(false)}
                footer={[]}
                >
                <Form 
                    // form={formChangePassword}
                    className="mt-1"
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Text style={{fontWeight: "500"}}>No Hp <span className="text-danger">*</span></Text>
                    <Form.Item
                        className="mb-2"
                        rules={[{ required: true, message: 'No Hp tidak boleh kosong.' }]}>
                        <Input
                            className="mt-1"
                            value={payload.phone || ""}
                            name="user_phone"
                            allowClear
                            onChange={handleChange}
                            maxLength={12}
                            placeholder="Masukkan No Hp" /> 
                    </Form.Item>
                    <Button key="pay" type="primary" className="mt-2" htmlType="submit" loading={loading.isSubmitLoading} block>
                        { userRecord.phone == "" ? "Daftar" : "Ubah" }
                    </Button>
                </Form >
            </Modal>

            <Row>
                <Col span={6} xs="4" xs={{ order: 2 }} sm="4" sm={{ order: 1 }} md="4" lg="4" xl="4">
                    <SettingProfile user={userRecord} />
                </Col>
                <Col span={6} xs="8" xs={{ order: 1 }} sm="8" sm={{ order: 2 }} md="8" lg="8" xl="8" className="mb-3">
                    <p className="mb-2 f-18 font-weight-bold">Biodata</p>
                    <hr className="mt-1 mb-1" />
                    <div className="mb-2 row">
                        <label className="col-sm-3 col-form-label font-weight-bold">Nama</label>
                        <div className="col-sm-9">
                            <label className="col-form-label">{userRecord.full_name}</label>
                        </div>
                    </div>
                    {/* <div className="mb-2 row">
                        <label className="col-sm-3 col-form-label font-weight-bold">Alamat</label>
                        <div className="col-sm-9">
                            <label className="col-form-label">{user.address || "-"}</label>
                        </div>
                    </div> */}
                    
                    <p className="mt-3 mb-2 f-18 font-weight-bold">Kontak</p>
                    <hr className="mt-1 mb-1" />
                    <div className="mb-2 row">
                        <label className="col-sm-3 col-form-label font-weight-bold">Email</label>
                        <div className="col-sm-9">
                            <label className="col-form-label">{userRecord.email}</label> <Tag color="green">Terverifikasi</Tag>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-3 col-form-label font-weight-bold">No Hp</label>
                        <div className="col-sm-9">
                            { userRecord.phone == "" ? 
                                <Tag color="red">Belum Terdaftar</Tag> : 
                                <label className="col-form-label">{userRecord.phone || "-"}</label> 
                            }
                            {' '}
                            <span onClick={() => setIsModalShow(true)} style={{"cursor": "pointer", "fontWeight": "500", "color": "#1890ff"}}>
                            {' '}{ userRecord.phone == "" ? "Daftar" : " Ubah" }
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
}
const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(InformationTab);