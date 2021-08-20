var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'Count': '1',
'UserId': '1',
'Type': '1' 
});
var config = {
  method: 'post',
  url: 'http://114.55.251.153:8021/Api/ApiForApp/UpdateSFZhen?Sf_ToArea="闵行"&Sf_ToZhen="虹桥镇"&Sf_AppYear=2021&Sf_Roads=2&Sf_RoadsRemark=&Sf_ZhenId=1',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response: { data: any; }) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
});