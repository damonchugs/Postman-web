var data = "Count=1&UserId=1&Type=1";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://114.55.251.153:8021/Api/ApiForApp/UpdateSFZhen?Sf_ToArea=%22%E9%97%B5%E8%A1%8C%22&Sf_ToZhen=%22%E8%99%B9%E6%A1%A5%E9%95%87%22&Sf_AppYear=2021&Sf_Roads=2&Sf_RoadsRemark=&Sf_ZhenId=1");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(data);