import React from 'react'
import { notification } from 'antd';

import {
    ExclamationCircleOutlined,
    CheckOutlined
} from '@ant-design/icons';

const sideNotification = {
    open(title, message, is_success){
        var icon = <ExclamationCircleOutlined style={{ color: 'red' }} />;
        if (is_success) {
            icon = <CheckOutlined style={{ color: 'green' }} />;
        }

        notification.open({
            message: title,
            description:
                message,
                icon: icon,
            onClick: () => {
            },
        });
    }
}
export default sideNotification