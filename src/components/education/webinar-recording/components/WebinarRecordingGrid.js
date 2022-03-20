import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import { Card, Image, Descriptions, Alert } from 'antd';
import { connect } from 'react-redux';
import serverUrl from '../../../../config/serverUrl';

export function WebinarRecordingGrid({listData, loading}){
    return (
        <Row>
            {(() => {
                if (loading != null || !loading) {
                    return (
                        <>
                            {listData.length > 0 ? 
                                <>
                                    {(listData).map((item, index) => {
                                        return  <Col sm="6" md="6" lg="4" className="mb-4" key={item.id}>
                                                    <a href={`/edukasi/webinar-recording/${item.path_url}`} >
                                                        <Card
                                                            className='card-education'
                                                            key={item.id}
                                                            hoverable
                                                            cover={
                                                                <Image
                                                                    className="cover-image-education"
                                                                    preview={false}
                                                                    src={serverUrl + "/" + item.filepath}
                                                                    onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}} />
                                                            }
                                                            style={{ width: "auto" }}>
                                                            <Descriptions
                                                                className="descriptions-content"
                                                                title={
                                                                    <div className='f-14 section-education-header'>
                                                                        <div className='mb-0 title text-wrap'>{item?.title || "-     "}</div>
                                                                        <span className='f-300 sub-title'>{item?.webinar_level || "-"}</span>
                                                                    </div>
                                                                }
                                                                key={item.id} />
                                                        </Card>
                                                    </a>
                                                </Col>
                                        })
                                    }
                                </> :   
                                <Col sm="12" md="12" className="mb-4 text-center">
                                    <Alert
                                        message={<span className='f-15 fw-500'>Tidak ada Webinar Recording ditemukan.</span>}
                                        type="warning"
                                    />
                                </Col>
                            }
                        </>
                    )
                }
            })()}
        </Row>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(WebinarRecordingGrid);