import axios from "axios"
import { base_url } from "../url/api_url"
export let axiosInstance=axios.create({
    baseURL:base_url
})

axiosInstance.interceptors.request.use(
async function (config) {
    const token=sessionStorage.getItem("token")||localStorage.getItem('token');
    if(token){
        config.headers['X-access-token']=token;
        // config.headers.Autorization=token
        // config.headers.Autorization=`Bearer ${token}`
    }
    return config;
},
function(err){
    return Promise.reject(err);
}
);

//path setup of image-url for profile pic
export const profileURL=(media)=>{
    return base_url+`uploads/user/profile_pic/${media}`;
}