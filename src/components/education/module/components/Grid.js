import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import { Card, Image, Tag, Descriptions, Alert } from 'antd';
import { connect } from 'react-redux';
import serverUrl from '../../../../config/serverUrl';

const Grid = (props) => {
    return (
        <Row>
            {(() => {
                if (!props.loading) {
                    return (
                        <>
                            {props.listData.length > 0 ? 
                                <>
                                    {(props.listData).map((item, index) => {
                                        return  <Col sm="6" md="6" lg="4" className="mb-4" key={item.id}>
                                                    {!props.user || !props.user.is_membership ?
                                                        <div onClick={() => props.setShow(true)}>
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
                                                                            <div className='mb-0 title text-wrap'>{item.title}</div>
                                                                            <span className='f-300 sub-title'>{item.level}</span>
                        
                                                                            <Tag className="tag-rounded fw-600 float-right" color="#108ee9">{item.total_videos} Video{item.total_videos > 1 && ("s")}</Tag>
                                                                        </div>
                                                                    }
                                                                    key={item.id} />
                                                            </Card>
                                                        </div>
                                                        :
                                                        <a href={`/edukasi/modul-pembelajaran/${item.path_url}`} >
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
                                                                            <div className='mb-0 title text-wrap'>{item.title}</div>
                                                                            <span className='f-300 sub-title'>{item.level}</span>
                        
                                                                            <Tag className="tag-rounded fw-600 float-right" color="#108ee9">{item.total_videos} Video{item.total_videos > 1 && ("s")}</Tag>
                                                                        </div>
                                                                    }
                                                                    key={item.id} />
                                                            </Card>
                                                        </a>
                                                    }
                                                </Col>
                                        })
                                    }
                                </> :   
                                <Col sm="12" md="12" className="mb-4 text-center">
                                    <Alert
                                        message={<span className='f-15 fw-500'>Tidak ada Modul Pembelajaran ditemukan.</span>}
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
export default connect(mapStateToProps, null)(Grid);