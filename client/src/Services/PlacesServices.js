import config from './proxy.json';
import axios from "axios";

const Place = config.proxy + 'places/';
export function AddPlace(obj,token) {
    return axios.post(`${Place}`, obj,{headers:{'auth-token': token}})
}
export function GetPlaces() {
    return axios.get(`${Place}`)
}
export function GetPlace(id, token) {
    return axios.get(`${Place}${id}`,{headers:{'auth-token': token}})
}
export function DeletePlace(id,token){
    return axios.delete(`${Place}${id}`,{headers:{'auth-token': token}})
}
export function UpdatePlace(id,object,token){
    return axios.patch(`${Place}${id}`,object,{headers:{'auth-token': token}})
}