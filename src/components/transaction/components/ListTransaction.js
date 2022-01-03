import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Button, Image, Alert, message, Upload, Modal, Pagination, List, Select, notification, Card } from 'antd';
import { DatePicker } from 'antd';
import { connect } from 'react-redux'
import { showUploadTransferModal, hideUploadTransferModal } from '../../../config/redux/action';
import ListItem from './ListItem'
import axiosApi from '../../../config/axiosConfig';
import serverUrl from '../../../config/serverUrl';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListTransaction = props => {
    const [listData, setlistData] = useState([{}]);
    const [totalData, setTotalData] = useState(0);
    const [payload, setPayload] = useState({
        page: 1,
        size: 10,
        filter: [
            {
                "field": "created_by",
                "operator": "=",
                "value": props.user.id,
            },
            {
                "field": "membership_id",
                "operator": "",
                "value": "",
            },
            {
                "field": "webinar_id",
                "operator": "",
                "value": "",
            },
            {
                "field": "payment_status",
                "operator": "=",
                "value": "",
            },
        ]
    })
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });

    useEffect(() => {
        window.addEventListener('keyup', onKeyup)
        loadPagination();
    }, []);

    useLayoutEffect(() => {
        loadPagination();
    }, [payload]);

    function onPageChange(page, pageSize){
        setPayload({
            ...payload,
            page: page,
            size: pageSize, 
        })
    }

    const loadPagination = () => {
        setLoading({...loading, isContentLoading: true});
        axiosApi.post(`/payment/getPagination`, payload)
        .then(res => {
            var r = res.data;
            setTotalData(r.total);
            setlistData(r.data || [])
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            setLoading({...loading, isContentLoading: false});
        });
    }

    const onKeyup = async ({ key }) => {
        if (key === "Escape") {
            const res = await props.hideUploadTransferModal(false)
            .catch(err => err);
            if (res) {
                //-- Do Nothing
            } else {
                //-- Do Nothing
            }
        }
    };
    
    const hideUploadTransferModal = async (event) => {
        const res = await props.hideUploadTransferModal(false)
            .catch(err => err);
        if (res) {
            //-- Do Nothing
        } else {
            //-- Do Nothing
        }
    }

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

    function handlePaymentStatusChange(e) {
        payload.filter[3].value = "";
        var payment_status = "";
        if (e === "pending") {
            payment_status = "2";
        } else if (e === "success") {
            payment_status = "200";
        } else if (e === "failed") {
            payment_status = "3";
        }
        payload.filter[3].value = payment_status;
        loadPagination();
    }

    function handleTypeChange(e) {
        payload.filter[1].value = "";
        payload.filter[2].value = "";
        if (e === "membership") {
            payload.filter[1].value = "IS NOT NULL";
            payload.filter[2].value = "";
        } else if (e === "webinar") {
            payload.filter[1].value = "";
            payload.filter[2].value = "IS NOT NULL";
        }
        loadPagination();
    }

    const handleChangeUpload = info => {
        var formData = new FormData();
        formData.append("file", info.file.originFileObj);
        axiosApi.post(`/filemaster/uploadByType/payment_transfer/1/${props.parent.parentRecord.id}`, formData)
        .then(res => {
            var r = res.data;
            if (r.status) {
                openNotification();
                hideUploadTransferModal(false);
            } else {
                message.error(r.message);
            }
        });
    };

    const openNotification = () => {
        const args = {
            message: 'Upload File Berhasil',
            description: 'Terima kasih telah melakukan pembayaran dan akan kami verifikasi terlebih dahulu.',
        };
        notification.open(args);
    };

    return (
        <Fragment>
            <Modal 
                title="Upload Bukti Pembayaran" 
                centered
                visible={props.parent.isParentModal}
                // visible={true}
                onCancel={hideUploadTransferModal}
                footer={[
                    <Fragment key="fragment">
                    </Fragment>
                ]}
                width={800}
                >

                <Alert className="mb-2"
                    message={<p className="mb-0">Unggah Bukti Pembayaran untuk mempercepat verifikasi</p>}
                    type="success"
                />
                <Row className="mb-2">
                    <Col lg="12" className="mb-3"><span className="f-12 font-weight-bold">Pastikan bukti pembayaran menampilkan informasi seperti berikut:</span></Col>
                    <Col lg="6">
                        <p className="mb-0 f-12 font-weight-bold">Tanggal / Waktu Transfer</p>
                        <span className="f-12">Contoh: 20/10/2020 dan Jam: 18:30</span>
                    </Col>
                    <Col lg="6">
                        <p className="mb-0 f-12 font-weight-bold">Informasi Penerima</p>
                        <span className="f-12">Contoh: Transfer ke Rekening PT. Risambessy Konsultindo Mandiri</span>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg="6">
                        <p className="mb-0 f-12 font-weight-bold">Status Berhasil</p>
                        <span className="f-12">Contoh: Transfer Sukses atau Transfer Berhasil</span>
                    </Col>
                    <Col lg="6">
                        <p className="mb-0 f-12 font-weight-bold">Jumlah Transfer</p>
                        <span className="f-12">Contoh: Rp 654,321.00</span>
                    </Col>
                </Row>

                
                <Row>
                    <Col md="12" className="mt-2">
                        <p className="mb-1 f-12 font-weight-bold">Upload</p>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg="4" className="mt-2">
                        {props.parent.file.filepath ? 
                            <Image
                                style={{width: "100%"}}
                                src={serverUrl + "/" + props.parent.file.filepath}
                            />
                        : null
                        }
                    </Col>
                </Row>
            </Modal>
            
            <Row>
                <Col md="4" lg="3" className="mb-3">
                    <Card size="small" title="Filter" className="borderShadow5">
                        <p className="font-weight-bold f-14 mb-1">Status Bayar:</p>
                        <Select 
                            className="mr-1 mb-1"
                            defaultValue="all"
                            style={{ width: "100%" }}
                            onChange={handlePaymentStatusChange}>
                            <Option value="all">Semua Status</Option>
                            <Option value="success">Sudah dibayar</Option>
                            <Option value="pending">Menunggu Pembayaran</Option>
                            <Option value="failed">Gagal</Option>
                        </Select>
                        <p className="font-weight-bold f-14 mb-1">Jenis Transaksi:</p>
                        <Select 
                            className="mr-1 mb-1"
                            defaultValue="all"
                            style={{ width: "100%" }}
                            onChange={handleTypeChange}>
                            <Option value="all">Semua Tipe</Option>
                            <Option value="membership">Membership</Option>
                            <Option value="webinar">Webinar</Option>
                        </Select>
                    </Card>
                </Col>
                <Col md="8" lg="9">
                    {totalData > 0 ? 
                        <Fragment>
                            <p className="font-weight-bold f-14 mb-1">Total Transaksi adalah {totalData}</p>
                            <List
                                itemLayout="vertical"  size="large"
                                dataSource={listData}
                                loading={loading.isContentLoading}
                                renderItem={item => <ListItem obj={item} />}
                            />
                            <Pagination
                                onChange={onPageChange}
                                current={payload.page}
                                className="float-right" 
                                total={totalData}
                                responsive={true}
                            />
                        </Fragment>
                    : 
                        <Card>
                            <p className="text-center f-16 mb-0">Tidak ada Riwayat Transaksi</p>
                        </Card>
                    }
                </Col>
            </Row>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        parent: state.parentRecord,
    }
}
const reduxDispatch = (dispatch) => ({
    showUploadTransferModal: (data) => dispatch(showUploadTransferModal(data)),
    hideUploadTransferModal: () => dispatch(hideUploadTransferModal(false))
})
export default connect(mapStateToProps, reduxDispatch)(ListTransaction);