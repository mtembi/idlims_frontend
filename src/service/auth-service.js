import axios from 'axios';
import * as appConstants from "../constant";

class AuthService{

    login(username, password){
        return axios
            .post(
                appConstants.API_URL+"/authenticate",
                {username, password}
            )
            .then(response=>{
                if(response.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();