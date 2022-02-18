
import React from 'react'
import { useState,useEffect } from 'react'

function App() {

    const [search, setSearch] = useState("karachi");
    const [city, setCity] = useState("");
    const [cities, setAllCities] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);
    const [singleDisplay, setSingleDisplay] = useState(true)
   
    const [nameForSingle , setName] = useState("");
    const [tempForSingle, setTemp] = useState("");
    const [picForSingle, setPic] = useState("")
    useEffect(() => {
        fetchWeatherAndPic();
      }, []);
    const fetchWeatherAndPic = () => {

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=77ec52b68155ea2d5c46d357b46efb85&units=metric`;
        const weatherFetch = fetch(weatherUrl)

        weatherFetch.then((res) => {
            const weatherJson = res.json()

            weatherJson.then(data => {
                if (data.message === "city not found") {
                    console.log("error")
                }
                else {

                    setCity(data)
                    
                    setName(data.name)
                    setTemp(data.main.temp)
                    setAllCities((previousData) => {
                        const AllData = [...previousData];
                        AllData.push(data)
                        return AllData
                    })
                }
            })

        })
        weatherFetch.catch((error) => {
            console.log(error);
        })
        console.log(search)
        console.log(city, "city")
        console.log(cities, "all cities");

        fetch(
            `https://api.unsplash.com/search/photos?query=${search}&client_id=P9qZTGiPrL97dQ7Reypb06yzGEXYO_mSCiwSnSubGQQ`
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("You made a mistake");
                }
            })
            .then((data) => {
                console.log(data);
                setPic(data?.results[0]?.urls?.raw)
                setAllPhotos([...allPhotos, data?.results[0]?.urls?.raw])
                
                console.log(allPhotos)
            })
            .catch((error) => console.log(error));
    }
    function showSingleDisplay() {
        setSingleDisplay(true)
    }
    function showMultipleDisplay() {
        setSingleDisplay(false)
    }


    return <div>
        <button onClick={showSingleDisplay}> Show Single City  </button>
        <button onClick={showMultipleDisplay}>Show Multiple Cities</button>

        <input placeholder='Enter city name' onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => fetchWeatherAndPic()}>Search City</button>
        {!singleDisplay ?
            <div>
                {cities.map((city, ind) => {
                    const { main, name } = city;
                    const { temp } = main;
                    return <p key={ind}>City : {name} <span>Temperature : {temp}</span></p>
                })}

                {allPhotos.map((pic, ind) => {
                    return <img src={pic} width="250" height="200" key={ind} alt="" />
                })}
            </div>
            : 
            
            
             <div>
                <p>City : {nameForSingle} <span>Temperature : {tempForSingle}</span></p>    
                <img src={picForSingle} width="250" height="200" alt=""/>
                </div>
                
                
                
                
                }
            
        

            




    </div>
            



}
export default App
