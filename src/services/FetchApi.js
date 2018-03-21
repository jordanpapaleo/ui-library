export default class FetchApi {
  static timeout = 12000

  static headers = {
    'Accept': 'application/json, text/javascript; q=0.9, */*; q=0.6',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json'
  }

  constructor (props) {
    const {baseUrl, headers, errorHandler} = props
    this.errorHandler = errorHandler
    this.baseUrl = baseUrl
    this.headers = {
      ...FetchApi.headers
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

  request = (url, options, passThrough) => {
    const {errorHandler} = this

    return fetch(url, options)
      .then(async (response) => {
        if (response.ok) {
          if (response.status !== 204) {
            let data

            if (response.headers.get('content-type') === 'image/jpeg' || response.headers.get('content-type') === 'text/csv') {
              data = await response.text()
            } else {
              data = await response.json()
            }

            return (passThrough)
              ? {...passThrough, ...data}
              : data
          }
        } else {
          const apiError = new Error('Fetch API Error')
          apiError.response = response

          if (errorHandler) {
            errorHandler(apiError)
          } else {
            throw apiError
          }
        }
      })
      .catch(() => {
        const callError = new Error('Fetch Call Error')

        if (errorHandler) {
          errorHandler(callError)
        } else {
          throw callError
        }
      })
  }

  get = (url, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  post = (url, data, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: this.headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data,
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  put = (url, data, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      body: this.headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data,
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  delete = (url, passThrough, timeout = FetchApi.timeout) => {
    const {headers, request, baseUrl} = this
    const options = {
      timeout,
      headers,
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }
}
