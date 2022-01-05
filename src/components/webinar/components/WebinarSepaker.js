import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Card, Image, Rate } from 'antd';

import serverUrl from '../../../config/serverUrl';
const { Meta } = Card;

const WebinarSpeaker = (props) => {
    return (
        <Fragment>
            <Card className="mb-3">
                <Meta
                    avatar={
                        <a href={`/speaker/review/${props.speaker.speaker_id}`}>
                            <Image 
                                style={{width: "50px", height: "50px", borderRadius: "200px", border: "1px solid #ccc"}} 
                                src={serverUrl}
                                shape="square"
                                preview={false}
                                onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                            />
                        </a>
                    }
                    title={
                        <div style={{marginTop: (props.speaker.speaker_title ? "-5px" : "0px" )}}>
                            <a href={`/speaker/review/${props.speaker.speaker_id}`} className="f-17 text-dark">{props.speaker.organization_name !== "" ? props.speaker.organization_name : props.speaker.speaker_full_name}</a>
                        </div>
                    }
                    description={
                        <Fragment>
                            <p className="f-13 text-muted" style={{marginTop: "-13px", marginBottom: "5px"}}>{props.speaker.speaker_title}</p>
                            <div style={{marginTop: "-12px"}}>
                                <Rate allowHalf disabled value={props.speaker.rating} className="mr-2" /> <strong>({props.speaker.total_rating} Ulasan)</strong> 
                            </div>
                        </Fragment>
                    }
                />
            </Card>
        </Fragment>
    )
}
export default WebinarSpeaker