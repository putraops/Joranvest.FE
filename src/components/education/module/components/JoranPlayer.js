import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import { Card, Image, Tag, Descriptions } from 'antd';
import { connect } from 'react-redux';
import serverUrl from '../../../../config/serverUrl';
import ReactPlayer from 'react-player'

const JoranPlayer = (props) => {
    const [playerState, setPlayerState] = useState({
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    });

    
    const handlePlayPause = () => {
        setPlayerState({...playerState, playing: !playerState.playing })
    }

    const handleStop = () => {
        setPlayerState({ url: null, playing: false })
    }

    // const handleToggleControls = () => {
    //     const url = playerState.url
    //     setPlayerState({
    //     controls: !playerState.controls,
    //     url: null
    //     }, () => load(url))
    // }

    const handleToggleLight = () => {
        setPlayerState({ light: !playerState.light })
    }

    const handleToggleLoop = () => {
        setPlayerState({ loop: !playerState.loop })
    }

    const handleVolumeChange = e => {
        setPlayerState({ volume: parseFloat(e.target.value) })
    }

    const handleToggleMuted = () => {
        setPlayerState({ muted: !playerState.muted })
    }

    const handleSetPlaybackRate = e => {
        setPlayerState({ playbackRate: parseFloat(e.target.value) })
    }

    const handleOnPlaybackRateChange = (speed) => {
        setPlayerState({ playbackRate: parseFloat(speed) })
    }

    const handleTogglePIP = () => {
        setPlayerState({ pip: !playerState.pip })
    }

    const handlePlay = () => {
        console.log('onPlay')
        setPlayerState({...playerState, playing: true })
    }

    const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setPlayerState({...playerState, pip: true })
    }

    const handleDisablePIP = () => {
        console.log('onDisablePIP')
        setPlayerState({...playerState, pip: false })
    }

    const handlePause = () => {
        console.log('onPause')
        setPlayerState({...playerState, playing: false })
    }

    const handleSeekMouseDown = e => {
        setPlayerState({ seeking: true })
    }

    const handleSeekChange = e => {
        setPlayerState({...playerState, played: parseFloat(e.target.value) })
    }

    // const handleSeekMouseUp = e => {
    //     setPlayerState({ seeking: false })
    //     player.seekTo(parseFloat(e.target.value))
    // }

    const handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!playerState.seeking) {
        setPlayerState(state)
        }
    }

    const handleEnded = () => {
        console.log('onEnded')
        setPlayerState({ playing: playerState.loop })
    }

    const handleDuration = (duration) => {
        console.log('onDuration', duration)
        setPlayerState({ duration })
    }

    // const handleClickFullscreen = () => {
    //     screenfull.request(findDOMNode(player))
    // }

    return (
        <>
            <div style={{width: "100%", height: "400px", backgroundColor: "transparent", position: "absolute"}}>

            </div>
            <ReactPlayer 
                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                width={"auto"}
                height={400}
                pip={playerState.pip}
                playing={playerState.playing}
                controls={playerState.controls}
                light={playerState.light}
                loop={playerState.loop}
                playbackRate={playerState.playbackRate}
                volume={playerState.volume}
                muted={playerState.muted}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={handlePlay}
                onEnablePIP={handleEnablePIP}
                onDisablePIP={handleDisablePIP}
                onPause={handlePause}
                onBuffer={() => console.log('onBuffer')}
                // onPlaybackRateChange={handleOnPlaybackRateChange}
                onSeek={e => console.log('onSeek', e)}
                onEnded={handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={handleProgress}
                onDuration={handleDuration}
                
                // controls={false}
                // // fallback={<div>TESS</div>}
                // onSeek={e => console.log('onSeek', e)}
                // playing={playerState.playing}
            />
            <button onClick={() => handlePlayPause()}>Play</button>
            <input
            type='range' min={0} max={0.999999} step='any'
            value={playerState.played}
            // onMouseDown={() => handleSeekMouseDown}
            onChange={() => handleSeekChange()}
            // onMouseUp={handleSeekMouseUp}
            />
            
            
            {/* <progress max={1} value={playerState.played} />
            <input
            type='range' min={0} max={0.999999} step='any'
            value={playerState.played}
            // onMouseDown={handleSeekMouseDown}
            // onChange={handleSeekChange}
            // onMouseUp={handleSeekMouseUp}
            /> */}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(JoranPlayer);