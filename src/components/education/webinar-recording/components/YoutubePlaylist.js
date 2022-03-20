import React, { useEffect } from 'react'
import { Card, Spin } from 'antd';
import ReactPlayer from 'react-player';

import { 
    LoadingOutlined
} from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export function YoutubePlaylist({user, hasAccess, record}){
    useEffect(() => {
    }, []);

    return (
        <>
            <Card className={!hasAccess ? "" : "card-player"} loading={hasAccess === null ? true : false}>
                <Spin indicator={antIcon} spinning={false}>
                    {(() => {
                        if (!hasAccess) {
                            return (
                                <div id="section-player">
                                    <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                        <div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img src="assets/img/logo.png" alt="" width={`35%`}/>
                                                    {(() => {
                                                        if (record?.video_url === "") {
                                                            return (
                                                                <h6 className='mt-3 text-muted'>Tidak ada video tersedia.</h6>
                                                            )
                                                        } else {
                                                            return(
                                                                user ? 
                                                                    <h6 className='mt-3 text-muted'>Rekaman ini hanya bisa diakses oleh Peserta Webinar atau Member Premium.</h6> :
                                                                    <h6 className='mt-2 text-muted'>Jika kamu adalah Member Premium. Silahkan login terlebih dahulu <a href="/login" className="text-joran">disini</a>.</h6>
                                                            )
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <ReactPlayer
                                    url={record?.video_url || null}
                                    width={"auto"}
                                    height={400}
                                    controls={true}
                                    // onEnded={() => handleNextVideo()}
                                    // onPause={() => handlePause()}
                                    // onReady={() => console.log("ready")}
                                    // onPlay={() => markVideoAsWatched()} 
                                    config={{
                                        youtube: {
                                            playerVars: { showinfo: 1 }
                                        },
                                    }}
                                />
                            )
                        }
                    })()}
                </Spin>
            </Card>
        </>
    );
}