/**
 * Created by boyoung on 2/16/16.
 */
var crd;
var weather = {};

function geoFindMe(pos) {
  crd = pos.coords;
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + crd.latitude + '&lon=' + crd.longitude + '&APPID=933496ca3699414a61fb2d2ea47bf0dd';
  var request = $.getJSON(weatherAPI);

  request.done(function(data){
    var currentWeather = data.weather[0];
    weather.id = currentWeather.id;
    weather.country = data.sys.country;
    weather.main = currentWeather.main;
    weather.desc = currentWeather.description;
    weather.icon = currentWeather.icon;
    weather.curCity = data.name;
    weather.temp = data.main.temp;
    generateData();
  });
}

function kToc(value){
  return Math.round(Number(value) - 273.15);
}

function cTof(value){
  return Math.round((Number(value) * 1.8) + 32);
}

function fToc(value){
  return Math.round((Number(value)-32)/1.8);
}

function generateData(){
  $('img').attr({src: "http://openweathermap.org/img/w/" + weather.icon + ".png"});

  $('.temp').text(kToc(weather.temp));
  $('.main').text(weather.main);
  $('.city').text(weather.curCity.toUpperCase() + ', ' + weather.country);
  $('#currentWeather').fadeIn();
}

$(document).ready(function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(geoFindMe);
  }else{
    $('#currentWeather').html("Geolocation is not supported by your browser.");
  }

  $('.unit .c').on('click', function(){
    var c = $('.temp').text();
    $(this).css('display', 'none');
    $('.temp').text(cTof(c));
    $('.unit .f').css('display', 'inline');
  })

  $('.unit .f').on('click', function(){
    var f = $('.temp').text();
    $(this).css('display', 'none');
    $('.temp').text(fToc(f));
    $('.unit .c').css('display', 'inline');
  })
});