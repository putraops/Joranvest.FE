import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Card, Avatar, Rate } from 'antd';
const { Meta } = Card;

const WebinarSpeaker = (props) => {
    return (
        <Fragment>
            <Card className="mb-3">
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width: "50px", height: "50px"}} />}
                    title={
                        <div style={{marginTop: (props.speaker.speaker_title ? "-5px" : "0px" )}}>
                            <span className="f-17">{props.speaker.organization_name !== "" ? props.speaker.organization_name : props.speaker.speaker_full_name}</span>
                        </div>
                    }
                    description={
                        <Fragment>
                            <p className="f-13 text-muted" style={{marginTop: "-13px", marginBottom: "5px"}}>{props.speaker.speaker_title}</p>
                            <div style={{marginTop: "-12px"}}>
                                <Rate allowHalf disabled defaultValue={0} className="mr-2" /> <strong>(0 Ulasan)</strong> 
                            </div>
                        </Fragment>
                    }
                />
            </Card>
        </Fragment>
    )
}
export default WebinarSpeaker