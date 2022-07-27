//api.openweathermap.org/data/2.5/weather?q=Mainz&APPID=00b06629f7f045837e4b528cd08b2bc4

const city = document.querySelector(".weather_card_city_name")
const temperature = document.querySelector(".weather_card_degrees")
const weatherCondition = document.querySelector(".weather_card_condition")
const searchBar = document.querySelector(".input_search")
const inputCity=document.querySelector(".input_city")


async function getWeather(city) {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=00b06629f7f045837e4b528cd08b2bc4&units=metric`,{mode:"cors"})
    const weather = await response.json()

    let iconId=weather.weather[0].icon
    console.log(`http://openweathermap.org/img/wn/${iconId}@2x.png`)
    createWeather(weather)
}
getWeather("london")

function createWeather(weather) {
    console.log(weather)
    city.textContent = weather.name
    temperature.textContent = Math.round(weather.main.temp)
    const weatherConditionText = weather.weather[0].description.split(" ").map(desc=>desc[0].toUpperCase()+desc.slice(1)).join(" ")
    console.log(weatherConditionText)
    weatherCondition.textContent=weatherConditionText
}

searchBar.addEventListener("click", function searchCity() {
    if (inputCity.value.length === 0) {
        return
    }
    console.log(inputCity.value)
    getWeather(inputCity.value)
})
