var settings = {
  "url": "http://114.55.251.153:8021/Api/ApiForApp/UpdateSFZhen?Sf_ToArea=\"闵行\"&Sf_ToZhen=\"虹桥镇\"&Sf_AppYear=2021&Sf_Roads=2&Sf_RoadsRemark=&Sf_ZhenId=1",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "data": {
    "Count": "1",
    "UserId": "1",
    "Type": "1"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});