'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Buffer } from 'buffer'

const credentials = {
  username: 'max-admin',
  password: 'eDoq KWX7 JuZa XvmP kSV0 nxsN'
}

const token = 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = 'https://api.skushnir.com.ua/wp-json/wp/v2'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post.Authorization = token
axios.defaults.headers.put.Authorization = token
axios.defaults.headers.delete.Authorization = token

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
