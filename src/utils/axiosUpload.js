import axios from 'axios'
export default (formData) => {
  return new Promise((resolve, reject) => {
    // `http://bill.zhongcaicloud.com/bill/public/index.php/admin/attachment/api_upload`
    axios.post(`${document.location.protocol}//bill.zhongcaicloud.com/bill/public/index.php/admin/attachment/api_upload`, formData).then(res =>
      resolve(res.data.data.path)
      // resolve(res.url)
    )
  })
}
