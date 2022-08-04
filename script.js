//api.openweathermap.org/data/2.5/weather?q=Mainz&APPID=00b06629f7f045837e4b528cd08b2bc4

const city = document.querySelector(".weather_card_city_name")
const temperature = document.querySelector(".weather_card_degrees")
const weatherCondition = document.querySelector(".weather_card_condition")
const searchBar = document.querySelector(".input_search")
const inputCity = document.querySelector(".input_city")
const timeCity = document.querySelector(".weather_card_city_time")
const animItems2 = document.querySelectorAll(".anim_items2")
const errorMsg = document.querySelector(".error_msg")
const iconWeather = document.querySelector(".weather_icon")
const menuBurger = document.querySelector(".weather_card_menu_burger")
const weatherCardInfo = document.querySelector(".weather_card_info")
const weatherCardInfoHumidity = document.querySelector(".humidity")
const weatherCardInfoRain = document.querySelector(".rain")
const weatherCardInfoThermo = document.querySelector(".thermo")
const weatherCardInfoWind = document.querySelector(".wind")
const forecastContainer=document.querySelector(".forecast_section_container")



async function getWeather(city) {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=00b06629f7f045837e4b528cd08b2bc4&units=metric`,{mode:"cors"})
    const weather = await response.json()
    if (weather.cod == 404) {
        inputCity.classList.add("active")
        errorMsg.classList.add("active") 
    }
    else {
        createWeather(weather)
        errorMsg.classList.remove("active")
    }
    const hourly = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=00b06629f7f045837e4b528cd08b2bc4&units=metric`,{mode:"cors"})
    const hourlyWeather = await hourly.json()
    hourlyWeather.list.slice(0,5).forEach(hour=>createHourWeather(hour))
    
}
window.addEventListener("DOMContentLoaded",getWeather("london"))

function createWeather(weather) {
    Array.from(animItems2).forEach(animItem => {
        if (animItem.classList.contains("fade-in2")) {
        animItem.classList.remove("fade-in2")
        animItem.offsetWidth;
        animItem.classList.add('fade-in2')
    }
    else {
        animItem.classList.add("fade-in2")
    
        
    }})
    
    
    city.textContent = weather.name    
    temperature.textContent = Math.round(weather.main.temp)
    const weatherConditionText = weather.weather[0].description.split(" ").map(desc=>desc[0].toUpperCase()+desc.slice(1)).join(" ")
    weatherCondition.textContent = weatherConditionText
    //Icon 
    let iconId=weather.weather[0].icon
    iconWeather.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`
    //Weather Card
    weatherCardInfoThermo.textContent = Math.round(weather.main.feels_like)
   // weatherCardInfoRain.textContent = weather.main.feels_like
    weatherCardInfoHumidity.textContent = `${weather.main.humidity} %`
     weatherCardInfoWind.textContent = `${weather.wind.speed} km/h`
    
    
    displayTime(weather)
    
     //Refresh clock
    setInterval(() => weather.name === city.textContent?displayTime(weather):false
    ,60000)
}

searchBar.addEventListener("click",searchCity)

function searchCity() {
    
    inputCity.classList.toggle("active")
    if (inputCity.value.length === 0) {
        errorMsg.classList.remove("active")
        return
    }
   
    getWeather(inputCity.value)
    inputCity.value = ""
    inputCity.classList.remove("active")
    
}

function timeZone(time) {
d = new Date()
localTime = d.getTime()
localOffset = d.getTimezoneOffset() * 60000
utc = localTime + localOffset
var city = utc + (1000 * time) 
return new Date(city)
}


function displayTime (weather) {
    let time = String(timeZone(weather.timezone))
    let newTime = time.split(" ")[0] + ", " + time.split(" ")[4].slice(0, 5)
    timeCity.textContent = time.split(" ")[0] + ", " + time.split(" ")[4].slice(0, 5)
    
}


menuBurger.addEventListener("click", function () {
    menuBurger.classList.toggle("active")
    weatherCardInfo.classList.toggle("active")

})

function createHourWeather(hour) {
    const foreCastItems = document.querySelectorAll(".forecast_item")
    if (foreCastItems.length === 5) {
        forecastContainer.innerHTML=``
    }
    const element = document.createElement("div")
    element.classList.add("forecast_item")
    
    element.innerHTML=`
                    <div class="forecast_item_time ">${hour.dt_txt.slice(11,13)}</div>
                    <div class="forecast_item_temp ">${Math.round(hour.main.temp)}</div>
                    <div class="forecast_item_img "><img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt=""></div>
                    `
    
    forecastContainer.appendChild(element)
    
    
    
}


document.addEventListener('keydown', function(event){
  return inputCity.value.length>0 &&(event.keyCode==13)? searchCity() :null;
} );





