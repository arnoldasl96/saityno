import config from './proxy.json';
import axios from "axios";

const userApi = config.proxy + 'api/user';
const users = config.proxy + 'users';

export function GetUsers(){
    return axios.get(`${users}`);
}
export function RegisterUser(user){
    return axios.post(`${userApi}/register`, user)
}
export function LoginUser(user){
    return axios.post(`${userApi}/login`, user)
}
export function GetUser(id){
    return axios.get(`${users}/${id}`);
}
export function DeleteUser(id, token){
    return axios.delete(`${users}/${id}`, {headers:{'auth-token': token}});
}
export function UpdateUser(id, user, token){
    return axios.patch(`${users}/${id}`, {user}, {headers:{'auth-token': token}});
}