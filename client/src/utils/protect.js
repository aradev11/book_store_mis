import Error from './error';
export const protect = ({history}) => {
    if(!localStorage.getItem("auth-token")) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-role");
        history.push("/register");
        Error.notification.error("You are not Authorized");
      }
}
