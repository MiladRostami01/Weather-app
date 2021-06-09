// Free API for this : https://openweathermap.org/api

const api = {
  key: '***', // your APIkey 
  base: 'https://api.openweathermap.org/data/2.5/'
}

document.addEventListener('DOMContentLoaded' , () =>{
  fetch(`${api.base}weather?q=Tehran&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json()
    }).then(displayResult)
})

const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', (event)=> {
  //charCode 'Enter' is 13 
  if (event.keyCode == 13){
    getWeather(searchBox.value)
  }
})

const getWeather = (city) => {
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json()
    }).then(displayResult)
}

const displayResult = (weather) => {
  console.log(weather);
  let city = document.querySelector('.location .city')
  city.innerText=`${weather.name}, ${weather.sys.country}`

  let date = document.querySelector('.location .date')
  date.innerText = getDate()

  let icon = document.querySelector('.current .icon')
  icon.innerHTML = `<img src="assets/icons/${weather.weather[0].main}.svg" alt="${weather.weather[0].main} picture">`

  let temp = document.querySelector('.current .temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

  let weatherEl = document.querySelector('.current .weather')
  weatherEl.innerText = weather.weather[0].main

  let lowHi = document.querySelector('.current .low_hi')
  lowHi.innerHTML= `<span class="low">${Math.round(weather.main.temp_min)}°C</span> / <span class="hi">${Math.round(weather.main.temp_max)}°C</span>` 
}

const getDate = () =>{
  let now = new Date()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[now.getDay()]
  let date = now.getDate()
  let month = months[now.getMonth()]
  let year = now.getFullYear()

  return `${day} ${date} ${month} ${year} `

}