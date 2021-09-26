import React, { Fragment, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Card, Avatar, Rate } from 'antd';
const { Meta } = Card;


const WebinarSpeaker = (props) => {
    useEffect((ee) => {
    }, []);

    return (
        <Fragment>
            <Card className="mb-3">
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width: "100px", height: "100px"}} />}
                    title={
                        <div className="mt-2">
                            <span className="f-17">{props.speaker.speaker_full_name}</span>
                        </div>
                    }
                    description={
                        <div style={{marginTop: "-5px"}}>
                            <span className="f-14 text-muted">Professional Fasilisator</span>
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