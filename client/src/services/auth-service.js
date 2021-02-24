import { useHistory } from 'react-router-dom';

import axios from 'axios';

import Error from '../utils/error';


export default {

    employee: async () => {
        const history = useHistory();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`
            }
        }

        try {
            const { data } = await axios.get("/api/employee", config);

            return data.data
        } catch (err) {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("user-role");
            history.push("/register");
            Error.notification.error("You are not Authorized");
        }
    }
}