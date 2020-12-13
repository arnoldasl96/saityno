import config from './proxy.json';
import axios from "axios";

const Plane = config.proxy + 'planes/';
export function AddPlane(obj, token) {
    return axios.post(`${Plane}`, obj,{headers:{'auth-token': token}})
}
export function GetPlanes() {
    return axios.get(`${Plane}`)
}
export function GetPlane(id, token) {
    return axios.get(`${Plane}${id}`,{headers:{'auth-token': token}})
}
export function DeletePlane(id, token){
    return axios.delete(`${Plane}${id}`,{headers:{'auth-token': token}})
}
export function UpdatePlane(id,object, token){
    return axios.patch(`${Plane}${id}`,object,{headers:{'auth-token': token}})
}