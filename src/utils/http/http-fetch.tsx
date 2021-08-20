var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("Count", "1");
urlencoded.append("UserId", "1");
urlencoded.append("Type", "1");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://114.55.251.153:8021/Api/ApiForApp/UpdateSFZhen?Sf_ToArea=\"闵行\"&Sf_ToZhen=\"虹桥镇\"&Sf_AppYear=2021&Sf_Roads=2&Sf_RoadsRemark=&Sf_ZhenId=1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));