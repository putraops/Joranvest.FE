import React from 'react';
import 'antd/dist/antd.css';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 10,
            },
            user: {
                name: "",
            },
            listData: {total:0,data:[]}
        };
    }

    componentDidMount () {
        const { payload } = this.state;
       
    }

    
    render() {
        
      
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container mt-5">
                        <p className="h5 mb-3 f-18">Test Page</p>
                    </div>      
                </section>
            </React.Fragment>
        );
    }
}

export default Test;