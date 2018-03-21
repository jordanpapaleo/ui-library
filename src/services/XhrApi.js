import axios from 'axios'

export default class XhrApi {
  static timeout = 12000

  static headers = {
    'Accept': 'application/json, text/javascript',
    'Content-Type': 'application/json'
    // 'Accept-Encoding': 'gzip, deflate, br',
  }

  constructor (props) {
    const {baseUrl, headers, errorHandler} = props
    this.errorHandler = errorHandler
    this.baseUrl = baseUrl
    this.headers = {
      ...XhrApi.headers
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        if (headers[key] === null) {
          delete this.headers[key]
        } else {
          this.headers[key] = headers[key]
        }
      })
    }
  }

  request = (options, passThrough) => {
    const {errorHandler} = this

    return axios(options)
      .then(response => passThrough
        ? {...passThrough, ...response.data}
        : response.data
      )
      .catch(err => {
        const callError = new Error('xhr error')

        if (err) {
          callError.response = err.response
        }

        if (errorHandler) {
          errorHandler(callError)
        } else {
          throw callError
        }
      })
  }

  get = (url, passThrough, timeout = XhrApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'GET',
      mode: 'cors',
      url: `${baseUrl}/${url}`
    }

    return request(options, passThrough)
  }

  post = (url, data, passThrough, timeout = XhrApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      data,
      headers,
      timeout,
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
      url: `${baseUrl}/${url}`
    }

    return request(options, passThrough)
  }

  put = (url, data, passThrough, timeout = XhrApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      data,
      headers,
      timeout,
      credentials: 'include',
      method: 'PUT',
      mode: 'cors',
      url: `${baseUrl}/${url}`
    }

    return request(options, passThrough)
  }

  delete = (url, passThrough, timeout = XhrApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors',
      url: `${baseUrl}/${url}`
    }

    return request(options, passThrough)
  }
}
