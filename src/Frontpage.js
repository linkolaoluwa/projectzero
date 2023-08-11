import React, { useEffect, useState } from 'react'
import './style.css'


export const Frontpage = () => {
    const [data, setData] = useState({
      name: 'Lagos',
        celcius: 27,
        humidity: 70,
        speed:  4,
        image: '/images/clear.png'
    })
    const [city, setCity] = useState('')
    const [date, setDate] = useState(new Date())
     
    useEffect(() => {
      let timer = setInterval(() => setDate(new Date()), 1000)
      return function cleanup(){
        clearInterval(timer)
      }
    })
        const handleChange = (e) => {
        setCity(e.target.value)
       
    }
    const handleClick = () => {
        if (city !== ''){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb81ee7b954783333814e29752f6bd1a&&units=metric`)
        .then((response) => response.json())
        .then((data) =>  {
            let imageUrl = ''
            if(data.weather[0].main === 'Cloud'){
                imageUrl = 'images/snow.jpeg'
              } else if(data.weather[0].main === 'Clear'){
                imageUrl = 'images/clear.png'
              }else if(data.weather[0].main === 'Rain'){
                imageUrl = 'images/rain.png'
              } else if(data.weather[0].main === 'Drizzle'){
                imageUrl = 'images/moise.png'
              } else{
                imageUrl = 'images/sun.png'
              }
            setData({...data, celcius: data.main.temp, name: data.name, speed: data.wind.speed, humidity: data.main.humidity,
            image: imageUrl
            })
        })
    } 
    }
  return (
    <div className='container'>
        <div className='user-app'>
            <div className='user-input'>
                <input onChange={handleChange} type='text' placeholder='Enter a City Name'></input>
                <button onClick={handleClick} className='search-btn'><img src='/images/search-icon.png' alt='' className='search-icon'></img></button>
            </div>
            <div className='weather-condition'>
                <img src={data.image} alt=''></img>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
            </div>
            <div className='date'>
                
                <p>Date : {date.toLocaleDateString()}</p>
                <p>Time : {date.toLocaleTimeString()}</p>
                </div>
                <div className='weather-details'>
                <div className='humidity'>
                <img src='images/snow.jpeg' alt=''></img>
                <div className='humidity-text'>
                <h3>{Math.round(data.humidity)}%</h3>
                <p>Humidity</p>
                </div>
                </div>
                <div style={{marginLeft: 10}} className='humidity'>
                <img src='images/wind.png' alt=''></img>
                <div className='humidity-text'>
                <h3>{Math.round(data.speed)}km/h</h3>
                <p>Wind</p>
                </div>
                </div>


                </div>
                
        </div>
        
    </div>
  )
  }
export default Frontpage