import React, { Component } from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames';

class Video extends Component {

  constructor(props) {
    super(props);
    this.state = { videoWidth: 0, videoHeight: 0, videoMarginTop: 0, videoMarginLeft: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this._onReady = this._onReady.bind(this);
    this._setPlayerMargin = this._setPlayerMargin.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  updateWindowDimensions = () => {
    var ab = 0.3;
    var winWidth = this.vidContainer.clientWidth;
    var winHeight = this.vidContainer.clientHeight;

    var margin = 24;
    var overprint = 100;
    
    var abundance = this.vidContainer.clientHeight * ab;
        
    var vidWidth = winWidth + ((winWidth * margin) / 100);
    var vidHeight = Math.ceil((9 * winWidth) / 16)

    var vidMarginTop = -((vidHeight - winHeight) / 2);
    var vidMarginLeft = -((winWidth * (margin / 2)) / 100);

    if (vidHeight < winHeight) {
			vidHeight = winHeight + ((winHeight * margin) / 100);
			vidWidth = Math.floor((16 * winHeight) / 9);
			vidMarginTop = -((winHeight * (margin / 2)) / 100);
			vidMarginLeft = -((vidWidth - winWidth) / 2);
		}

		vidWidth += overprint;
		vidHeight += overprint;
		vidMarginTop -= overprint / 2;
		vidMarginLeft -= overprint / 2;

    this.setState({ videoWidth: vidWidth, videoHeight: vidHeight, videoMarginTop: vidMarginTop, videoMarginLeft: vidMarginLeft });
    this._setPlayerMargin();
  }

  _onReady(event) {
    this._setPlayerMargin();
    event.target.playVideo();
  }

  _setPlayerMargin() {
    var playerEl = document.getElementsByClassName('home-8-vid');
    if (playerEl && playerEl.length) { 
      playerEl = playerEl[0];
      playerEl.style.marginLeft = this.state.videoMarginLeft + "px";
      playerEl.style.marginTop = this.state.videoMarginTop + "px";
    }
  }

  render() {
    var vidContainer = {
      position: 'absolute',
      zIndex: 0,
      minWidth: '100%',
      minHeight: '100%',
      left: '0px',
      top: '0px',
      overflow: 'hidden',
      opacity: 1,
      transitionProperty: 'opacity'
    }

    const opts = {
      height: this.state.videoHeight,
      width: this.state.videoWidth,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        allowfullscreen: true,
        wmode: 'transparent',
        iv_load_policy: 3,
        html5: 1,
        widgetid: 1,
        origin: '*',
        loop: 1,
        start: 5
      }
    };

    const vidStyles = {
        height: this.state.videoHeight,
        width: this.state.videoWidth,
        marginLeft: this.state.videoMarginLeft,
        marginTop: this.state.videoMarginTop
    }

    return (
      <React.Fragment>
        <div id="wrapper_mbYTP_video"
          style={vidContainer} ref={(divElement) => this.vidContainer = divElement}>
          <YouTube
            containerClassName="home-8-vid-container"
            className="home-8-vid"
            videoId="JlvxDa7Sges"
            opts={opts}
            onReady={this._onReady}
            style={vidStyles}
          />
        </div>
        <div className="bg-overlay"></div>
      </React.Fragment>
    );
  }
}

export default Video;
