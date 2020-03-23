import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";

const loginUser = (token: string) => {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decoded = jwt_decode(token);
    console.log(decoded);

    // set user

};

const logoutUser = () => {
    // delete authToken in header
    setAuthToken('');
    localStorage.removeItem('jwtToken');
};

export {loginUser, logoutUser};