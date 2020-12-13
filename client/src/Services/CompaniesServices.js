import config from './proxy.json';
import axios from "axios";

const company = config.proxy + 'carriers/';
export function AddCompany(compan,token) {
    return axios.post(`${company}`, compan,{headers:{'auth-token': token}})
}
export function GetCompanies() {
    return axios.get(`${company}`)
}
export function GetCompany(id, token) {
    return axios.get(`${company}${id}`,{headers:{'auth-token': token}})
}
export function DeleteCompany(id, token){
    return axios.delete(`${company}${id}`, {headers:{'auth-token': token}})
}
export function UpdateCompany(id,object,token){
    return axios.patch(`${company}${id}`,object,{headers:{'auth-token': token}})
}
export function GetPlanes(id,token){
    return axios.get(`${company}${id}/planes`,{headers:{'auth-token': token}})
}
export function GetSpecificPlane(ownerid,planeid, token){
    return axios.get(`${company}${ownerid}/Planes/${planeid}`,{headers:{'auth-token': token}})
}