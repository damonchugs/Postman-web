var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//  'Count': '1',
// 'UserId': '1',
// 'Type': '1' 
// });
let Headers: Object = {};
// var config = {
//   method: 'post',
//   url: 'http://114.55.251.153:8021/Api/ApiForApp/UpdateSFZhen?Sf_ToArea="闵行"&Sf_ToZhen="虹桥镇"&Sf_AppYear=2021&Sf_Roads=2&Sf_RoadsRemark=&Sf_ZhenId=1',
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };

const request = (url: String, data: Object, method?: String, headers?: Object) => {
  return new Promise((resolve, reject) => {
    axios({ method, url, headers, data })
      .then((response: any) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error: any) => {
        reject(error)
      })
  })
};

export default request;