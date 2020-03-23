import axios from "axios";

const setAuthToken = (token : (string | boolean)) => {
    if(token){
        axios.defaults.headers.common['auth'] = token;
    }else{
        delete axios.defaults.headers.common['auth'];
    }
};

export default setAuthToken;