import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Button, Image, Alert, message, Upload, Modal, List, notification  } from 'antd';
import { connect } from 'react-redux'
import { showUploadTransferModal, hideUploadTransferModal } from '../../../config/redux/action';
import ListItem from './ListItem'
import axiosApi from '../../../config/axiosConfig';
import serverUrl from '../../../config/serverUrl';
import { UploadOutlined } from '@ant-design/icons';

const ListTransaction = props => {
    const [listData, setlistData] = useState([{}]);
    const [payload, setPayload] = useState({
        page: 1,
        size: 10,
    })
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });
    useEffect(() => {
        console.log("pending page", props);
     
        window.addEventListener('keyup', onKeyup)
        loadPagination();
    }, []);

    
    const loadPagination = () => {
        axiosApi.post(`/payment/getPagination`, payload)
        .then(res => {
            var r = res.data;
            console.log("getPagination: ", r.data);
            if (r.data.length > 0) {
                setlistData(r.data)
            }
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

    const handleChangeUpload = info => {
        console.log("handleChangeUpload: ", info)
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
                                // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                src={serverUrl + "/" + props.parent.file.filepath}
                            />
                        : null
                        }
                    </Col>
                </Row>
            </Modal>
            <List
                className="mt-2"
                itemLayout="vertical"  size="large"
                pagination={{
                onChange: page => {
                    //this.handlePage(page);
                },
                pageSize: payload.size,
                total: listData.total
                }}
                dataSource={listData}
                // footer={}
                renderItem={item => <ListItem obj={item} />}
            />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        parent: state.parentRecord,
    }
}
const reduxDispatch = (dispatch) => ({
    showUploadTransferModal: (data) => dispatch(showUploadTransferModal(data)),
    hideUploadTransferModal: () => dispatch(hideUploadTransferModal(false))
})
export default connect(mapStateToProps, reduxDispatch)(ListTransaction);