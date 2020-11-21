import axios from 'axios'
import qs from 'qs';
import { notification } from 'antd'


/**
 * 根据环境变量进行接口区分
 */
switch (process.env.NODE_ENV) {
    case "development":
        axios.defaults.baseURL = 'http://127.0.0.1:3000/development';
        break;
    case "test":
        axios.defaults.baseURL = 'http://127.0.0.1:3000/test';
        break;
    case "production":
        axios.defaults.baseURL = 'http://127.0.0.1:3000/production';
        break;
   
}
//设置超时请求时间
axios.defaults.timeout = 10000;
//设置cors跨域请求允许携带资源凭证
axios.defaults.withCredentials = true;
//设置post请求头：告知服务器请求主体的数据格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data=>qs.stringify(data);

//设置请求拦截器
axios.interceptors.request.use(config=> {
    //携带token
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  }, err => {
    notification.open({message: '请求超时!'});
    return Promise.reject(err);
  })
  //设置响应拦截器
  axios.defaults.validataStatus = status =>{
      //自定义响应成功的HTTP状态码
      return /^(2|3)\d{2}$/.test(status)
  }
  axios.interceptors.response.use(response=> {
        return response.data;
  },err =>{
      if(err.response){
        //请求已发送，只不过状态码不是200系列，设置不同状态码的不同处理
        switch (err.response.status) {
            case 401: //当前请求需要用户验证（一般是未登录）
                break;
            case 403: //服务器拒绝执行（token过期）
                localStorage.removeItem('token')
                break;
                //或者跳转到登录页
            case 404: //请求失败，请求的数据不存在
                break;
        }
        return Promise.reject(err.response)
      }else{
          //断网处理
          if(!window.navigator.onLine){
            //网络断开了
            notification.open({message: '网络断开了!'});
            return;
          }
          return Promise.reject(err)
      }
  })
/**
 * requestWrapper接受⼀个method参数 返回⼀个封装好的请求⽅法
 * 封装好的请求⽅法包含三个参数
 * @param {string} url 请求url
 * @param {object} paramsOrData 请求数据 get请求⾃动设置为params post设置为data
 * @param {object} config 请求配置 可以是axios⽀持的请求配置或⾃定义的请求配置
 */
  const requestWrapper = (method) => (url,params,formType) => {
    // 判断是get请求还是post请求
    let data = method === 'get' ? 'params' : 'data';
    // 判断发送请求的格式
    var contentType = formType?'application/x-www-form-urlencoded':'application/json';
    return axios({
          url: url,
          methods: method,
          [data]: params,
          headers:{
            "Content-type":contentType
            // 注意上传格式   默认是json
          }
      })
  }

// 封装后的理想效果
const get = requestWrapper('get')
const post = requestWrapper('post')

export default {get,post};




let url = "http://127.0.0.1:3000";
//get请求 例
get(url,{name:"admin"},false)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
//post请求 例
post(url,{name:"admin"},true)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})




