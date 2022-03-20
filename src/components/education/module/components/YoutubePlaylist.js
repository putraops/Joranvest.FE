import React, { useEffect } from 'react'
import { Card, Spin, List, Alert, Badge } from 'antd';

import ReactPlayer from 'react-player';
import * as services from '../services/service';

import { 
    LoadingOutlined
} from '@ant-design/icons';
import sideNotification from '../../../../commons/sideNotification';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export function YoutubePlaylist({userId, playerState, setPlayerState, playlistRecord, videoIndex, setVideoIndex, loading}){
    useEffect(() => {
    }, []);

    const markVideoAsWatched = () => {
        setPlayerState({
            ...playerState, 
            playing: true,
        });

        var payload = {
            application_user_id: userId,
            education_playlist_id: playerState.educationPlaylistId,
        }

		services.markVideoAsWatched(payload)
		.then(res => {
			var r = res.data;
            //-- Mark as read
            document.getElementById("playlist-" + playerState.educationPlaylistId).classList.remove("fw-500");

			if (r.status) {                
			} else {
				sideNotification.open("Something went Wrong!", r.message, false);
			}
		}).catch(res => {
			sideNotification.open("Something went Wrong!", res.message, false);
		})
	}

    const handlePause = () => {
        setPlayerState({
            ...playerState, 
            playing: false,
        });
    }

    const handleNextVideo = () => {
        var newIndex =videoIndex+1; 
        if (playerState.autoPlay && videoIndex < playlistRecord.length -1){
            setVideoIndex(newIndex);
            setPlayerState({
                ...playerState, 
                educationPlaylistId: playlistRecord[newIndex].id,
                url: playlistRecord[newIndex].file_url
            });
        } else if (videoIndex == playlistRecord.length -1) {
            setVideoIndex(newIndex);
            setPlayerState({
                ...playerState, 
                educationPlaylistId: null,
                url: null
            });
        }
    }

    const handleVideoSelected = (id) => {
        var index = playlistRecord.findIndex(x => x.id === id);
        setVideoIndex(index);
        setPlayerState({
            ...playerState,
            //autoPlay: false,
            educationPlaylistId: playlistRecord[index].id,
            url: playlistRecord[index].file_url
        });
    }

    return (
        <>
            <Card className="card-player">
                <Spin indicator={antIcon} spinning={loading.isPlayerLoading}>
                    {(() => {
                        if (playlistRecord.length === 0 || 
                            (playlistRecord.length > 0 && playerState.url === null)) {
                            return (
                                <div id="section-player">
                                    <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                        <div>
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <img src="assets/img/logo.png" alt="" width={`40%`}/>
                                                    {playlistRecord.length === 0 ? 
                                                        <h6 className='mt-3 text-muted'>Tidak ada video tersedia.</h6> :
                                                        <h6 className='mt-3 text-muted'>Yeayyy, Kamu telah menonton semua video</h6>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <ReactPlayer
                                    // url={"https://youtu.be/BfClDb1JTqA"}
                                    url={playerState.url}
                                    playing={playerState.playing}
                                    width={"auto"}
                                    height={400}
                                    controls={true}
                                    onEnded={() => handleNextVideo()}
                                    onPause={() => handlePause()}
                                    // onReady={() => console.log("ready")}
                                    onPlay={() => markVideoAsWatched()} 
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

            <Card className="card-player mt-4">
                <Spin indicator={antIcon} spinning={loading.isPlayerLoading}>
                    {playlistRecord.length > 0 ? 
                        <List
                            //size="large"
                            id="playlist-video"
                            dataSource={playlistRecord}
                            loading={loading.isPlaylistLoading}
                            // renderItem={item => <List.Item>{item.title}</List.Item>}
                            renderItem={item => (
                                    <List.Item style={{cursor: "pointer"}}
                                        actions={[]}>
                                        <List.Item.Meta
                                            // avatar={<LockOutlined className='f-17' />}
                                            // 

                                            title={<span id={`playlist-${item.id}`} className={`${item.is_watched ? "" : "fw-500"} mt-3`} onClick={() => handleVideoSelected(item.id)}>{item.title}</span>}
                                            description={(playerState.url === item.file_url && playerState.playing && (<div><Badge status="processing" /> <span className="text-joran">Sedang diputar...</span></div>))}
                                        />
                                        
                                    </List.Item>
                                )}
                        /> :
                        <Alert message={<p className="mb-0 pt-2 pb-2 f-16 font-weight-bold text-center">Tidak ada Video tersedia</p>}type="info" />
                    }
                </Spin>
            </Card>
        </>
    );
}