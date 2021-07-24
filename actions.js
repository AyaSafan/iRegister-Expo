export const LOGIN='login'
export const LOGOUT='logout'


export function login(currentUser, info){
    return {
    type:LOGIN,
    currentUser: currentUser,
    info: info
    }
}

export function logout(){
    return {
    type:LOGOUT,
    currentUser: null,
    }
}