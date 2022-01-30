import React, { Fragment } from 'react';

const Logo = (props) => {
    console.log(props);
    return (
        <Fragment>
            <div className="text-center">
                <a href="/">
                    <img src="assets/img/logo.png" alt="" style={{width: `${props.size ? props.size : "270px"}`}} /></a>
                <p className="mb-0" style={{fontSize: "23px", fontWeight: "400"}}>#investasiuntuksemua</p>
            </div>
        </Fragment>
    );
}

export default Logo;