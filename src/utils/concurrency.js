//并发请求

import axios from 'axios'
import { notification } from 'antd'


function requestSpreads (requestArr) {

  if (Object.prototype.toString.call(requestArr) === '[object Array]') {

    return axios.all(

      requestArr.map(res => res.catch(err => {

        notification.open({message:err})

      }))

    ).then(

      axios.spread(function (...res) {

        return Promise.resolve(res)

      })

    )

  } else {

    const error = new Error('参数错误！')

    try {

      throw error

    } catch (err) {
        notification.open({message:err})
    }

  }

}

// 执行并发请求函数

function sendAllApi (requestArr) {

  return new Promise((resolve) => {

    requestSpreads(requestArr).then(res => {

      return resolve(res)

    })

  })

}

// 使用方法

sendAllApi(requestArr).then(res => {

  console.log(res)

 // 返回数组，长度等同请求个数，res = [{}, {}]

})

export default sendAllApi