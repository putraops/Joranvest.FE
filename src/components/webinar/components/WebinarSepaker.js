import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Card, Avatar, Rate } from 'antd';
const { Meta } = Card;

const WebinarSpeaker = (props) => {
    console.log("props: ", props);
    return (
        <Fragment>
            <Card className="mb-3">
                <Meta
                    avatar={
                        <a href={`/speaker/review/${props.speaker.speaker_id}`}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width: "50px", height: "50px"}} />
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