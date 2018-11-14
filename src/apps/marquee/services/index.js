import axios from 'axios'

const request = async (url, params) => {
  let res = await axios.post(url, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  let { status, result } = res.data
  if (!status || status != 200) {
    console.error('[status=%s]: %o', status, res)
    return Promise.reject(res)
  }
  return result
}

export default {
  // params: { url, uid }
  fetch: params => request('https://apigw.to8to.com/cgi/dsa/circle/queryEvents', params),
  // params: { url, uid, platform, app_name, app_version, events  }
  delete: params => request('https://apigw.to8to.com/cgi/dsa/circle/deleteEvents', params),
  // params: { url, uid, platform, app_name, app_version, events  }
  save: params => request('https://apigw.to8to.com/cgi/dsa/circle/saveEvents', params)
}
