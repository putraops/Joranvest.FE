import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import NumberFormat from "react-number-format";
import { Typography } from 'antd';
const { Text } = Typography;

const WebinarPrice = (props) => {
    if (props.price === 0) {
        return (
            <Text>Gratis</Text>
        )
    } else {
        if (props.discount === 0) {
            return (
                <Text>
                    <NumberFormat
                        value={props.price}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="Rp"
                        />
                </Text>
            )
        } else {
            var total = props.price - props.discount;
            return (
                <Fragment>
                    <Text>
                        <NumberFormat
                            value={total}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="Rp"
                        />
                    </Text>
                    <Text delete className="text-muted ml-2" style={{fontSize: "18px", fontWeight: "400"}}>
                        <NumberFormat 
                            value={props.price}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="Rp"
                        />
                    </Text>
                </Fragment>
            )
        }
    }
}
export default WebinarPrice