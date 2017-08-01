jsonp('https://api.map.baidu.com/api?v=2.0&ak=Dv1NMU23dh1sGS9n2tUouDEYY96Dfzh3&s=1&callback=getCity');
window.onload = function() {
  btn.addEventListener('click', function () {
    jsonp(creatUrl()[0]);
    jsonp(creatUrl()[1]);
  });
  text.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
      jsonp(creatUrl()[0]);
      jsonp(creatUrl()[1]);
    }
  });
}

function getCity() {
  function city(result) {
    //取城市名，去掉市
    var city = result.name.substring(0, result.name.length - 1);
    //请求当前城市的天气数据信息
    jsonp(creatUrl(city)[0]);
    jsonp(creatUrl(city)[1]);
  }
  //创建地图Map实例
  var cityName = new BMap.LocalCity();
  cityName.get(city);
}

//数据请求
function jsonp(url) {
  var script = document.createElement('script');
  script.src= url;
  document.body.insertBefore(script, document.body.firstChild);
  document.body.removeChild(script);
}

//数请求成功回调函数，将获取到的数据放到页面相应的位置
function getWeather(response) {
  var oSpan = document.getElementsByClassName('msg');
  var data = response.result;
  oSpan[0].innerHTML = data[0].citynm;
  oSpan[1].innerHTML = data[0].days;
  oSpan[2].innerHTML = data[0].week;
  oSpan[3].innerHTML = data[0].weather;
  oSpan[4].innerHTML = data[0].temperature;
  oSpan[5].innerHTML = data[0].winp;
  oSpan[6].innerHTML = data[0].wind;

  var aDiv = document.getElementsByClassName('future-content');
  for (var i = 0; i < aDiv.length; i++) {
    var aSpan = aDiv[i].getElementsByClassName('future-msg');
    aSpan[0].innerHTML = data[i + 1].days;
    aSpan[1].innerHTML = data[i + 1].week;
    aSpan[2].innerHTML = data[i + 1].weather;
    aSpan[3].innerHTML = data[i + 1].temperature;
  }
  //根据数据返回不同的天气图片
  changeImg(response);
}
//根据数据更改相应图片
function changeImg(data) {
  var firstImg = document.getElementsByTagName("img")[0];
  var firstWeatherId = data.result[0].weatid;
  chooseImg(firstWeatherId, firstImg);

  var aImg = document.getElementById('get_future_msg').getElementsByTagName('img');
  for (var j = 0; j < aImg.length; j++) {
    var weatherId = data.result[j + 1].weatid;
    chooseImg(weatherId,aImg[j]);
  }
}

//选择图片
function chooseImg(id, index) {
  switch (id) {
    case '1':
      index.src = 'images/w1.png';
      break;
    case '2':
      index.src = 'images/w2.png';
      break;
    case '3':
      index.src = 'images/w3.png';
      break;
    case '4':
    case '5':
    case '6':
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
    case '20':
    case '22':
    case '23':
    case '24':
    case '25':
    case '26':
        index.src = 'images/w4.png';
        break;
    case '7':
        index.src = 'images/w6.png';
        break;
    case '14':
    case '15':
    case '16':
    case '17':
    case '18':
    case '27':
    case '28':
    case '29':
        index.src = 'images/w5.png';
        break;
    case '19':
    case '21':
    case '30':
    case '31':
    case '32':
    case '33':
        index.src = 'images/w7.png';
        break;
    default:
        index.src = 'images/w8.png';
  }
}

function getTodayWeather(response) {
  var oSpan = document.getElementsByClassName('msg');
  var data = response.results;
  oSpan[7].innerHTML = data[0].pm25;
  oSpan[8].innerHTML = data[0].index[4].zs;
  oSpan[9].innerHTML = data[0].index[1].zs;
  oSpan[10].innerHTML = data[0].index[2].zs;
  oSpan[11].innerHTML = data[0].index[0].zs;
}

//根据城市名字创建请求与url
function creatUrl () {
  var cityName = '';
  if (arguments.length === 0) {
    cityName = document.getElementById('text').value;
  } else {
    cityName = arguments[0];
  }
  var urls = [];
      urls[0] = 'https://sapi.k780.com/?app=weather.future&appkey=24797&sign=5b91421723a489d8d5cb4a2e27dedea5&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);
    urls[1] = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=Dv1NMU23dh1sGS9n2tUouDEYY96Dfzh3&callback=getTodayWeather&location=' + encodeURI(cityName);
  return urls;
}