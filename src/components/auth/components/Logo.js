import React, { Fragment } from 'react';

const Logo = (props) => {
    return (
        <Fragment>
            <div className="text-center">
                <a href="/"><img src="assets/img/logo.png" alt="" 
                    style={{
                        width: `${props.size ? props.size : "270px"}`,
                        marginBottom: `${props.isTagShow === false ? "15px" : "0px"}`,
                        marginTop: `${props.isTagShow === false ? "80px" : "0px"}`
                    }} />
                </a>
                {props.isTagShow === false ? 
                    null
                    : <p className="mb-0" style={{fontSize: "23px", fontWeight: "400"}}>#investasiuntuksemua</p>
                }
            </div>
        </Fragment>
    );
}

export default Logo;