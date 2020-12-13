import jwt from "jwt-decode"
export function TakeToken(){
    const tokenString = localStorage.getItem('token')
    let token = undefined
    if(tokenString){
        try {
           token = jwt(tokenString)
        } catch (error) {
            token = undefined
        }
    }
    return token
}