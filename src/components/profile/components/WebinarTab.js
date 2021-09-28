import React, { Fragment } from 'react';
import { Card  } from 'antd';

const { Meta } = Card;

class WebinarTab extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { user } = this.props;
        console.log("Information Tab: ", user);
        return (
            <Fragment>
                <p className="text-muted mb-2">Tidak ada daftar Webinar</p>
            </Fragment>
        );
    }
}

export default WebinarTab;