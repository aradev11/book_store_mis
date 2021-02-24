import {
    message,
    notification
} from 'antd';

const error = {
    success: (msg) => {
        return message.success(msg, 3);
    },
    error: ({msg}) => {
        return message.error(msg, 10);
    },
    info: ({ msg }) => {
        return message.info(msg, 10);
    },
    warning: ({msg}) => {
        return message.warning(msg, 10);
    },
    warn: ({msg}) => {
        return message.warn(msg, 10);
    },
    loading: ({msg}) => {
        return message.loading(msg, 10);
    },
    notification: {
        success: (message, description) => {
            notification.success( { message, description, placement: 'topRight'})
        },
        error: (message, description) => {
            notification.error( { message, description, placement: 'topRight' })
        },
        info: (message, description) => {
            notification.info( { message, description, placement: 'topRight' })
        },
        warning: (message, description) => {
            notification.warning( { message, description, placement: 'topRight' })
        },
        warn: (message, description) => {
            notification.warn( { message, description, placement: 'topRight' })
        },
        openBasic: (message, description) => {
            notification.open( { message, description, placement: 'topRight' })
        }
    }
}

export default error;