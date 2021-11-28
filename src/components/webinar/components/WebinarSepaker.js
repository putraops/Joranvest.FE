import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Card, Avatar, Rate } from 'antd';
const { Meta } = Card;

const WebinarSpeaker = (props) => {
    return (
        <Fragment>
            <Card className="mb-3">
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width: "80px", height: "80px"}} />}
                    title={
                        <div className={props.speaker.speaker_title ? "mt-2" : "mt-1"}>
                            <span className="f-17">{props.speaker.organization_name !== "" ? props.speaker.organization_name : props.speaker.speaker_full_name}</span>
                        </div>
                    }
                    description={
                        <div style={{marginTop: "-5px"}}>
                            {(() => {
                                if (props.speaker.speaker_title) {
                                    return (
                                        <span className="f-14 text-muted">{props.speaker.speaker_title}</span>
                                    )
                                }
                            })()}
                            <div>
                                <Rate allowHalf disabled defaultValue={4.5} className="mr-2" /> <strong>(142 Ulasan)</strong> 
                            </div>
                        </div>
                    }
                />
            </Card>
        </Fragment>
    )
}
export default WebinarSpeaker