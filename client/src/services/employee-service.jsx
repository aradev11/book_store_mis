import axios from 'axios';

import Error from '../utils/error';

export default {
    getEmployee: async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`
            }
        }
        try {
            const { data } = await axios.get(`/api/employee`, config);
            if(data && data.data) return data
        } catch (err) {
            Error.notification.error(err.response.data.error);
        }
    }
}








