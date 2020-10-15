import axios from 'axios';
import authHeader from './auth-header';
import * as appConstants from '../constant';

class UserService{
    getPublicContent(){
        return axios.get(appConstants.API_URL+"/all");
    }

    getUserBoard(){
        return axios.get(appConstants.API_URL+"/user", {headers: authHeader});
    }

    getModeratorBoard(){
        return axios.get(appConstants.API_URL+"/mod", {headers: authHeader});
    }

    getAdminBoard(){
        return axios.get(appConstants.API_URL+"/admin", {headers: authHeader});
    }
}

export default new UserService();