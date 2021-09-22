'use strict';
//Declare Variables
let token = process.env.API_KEY
let btn = document.querySelector(".submit-button")
let form = document.querySelector(".form-wrap")
let h1 = document.querySelector(".h1-city")
let aqi = document.querySelector(".h1-aqi")
let spinner = document.querySelector(".spinner-border")
let widget = document.querySelector(".widget")
let desc = document.querySelector(".desc-text")
let mapDiv = document.querySelector(".map")
let input = document.querySelector(".form")
// Map init
let map = L.map('map');
let marker;
let attribution = '&copy; <a href="https://aqicn.org/home/">AQICN</a>'
let tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?token=${token}`
let tiles = L.tileLayer(tileUrl, { 
    attribution,
    maxZoom: 13,
    minZoom: 13,
    zoomControl: false
})
map.removeControl(map.zoomControl)
tiles.addTo(map)
// INPUT AQI
form.addEventListener("submit" , (e)=>{
    e.preventDefault()
        // Take city Value and remove hidden class to spinner
        let city = input.value
        spinner.classList.remove("hidden")
        // Check if H1,AQI,widget,desc and mapDiv aren't empty
        if(h1.innerHTML != "" || h1.innerHTML != " "){
            h1.innerHTML=""
        } 
        if(aqi.innerHTML != "" || aqi.innerHTML != " "){
            aqi.innerHTML=""
        } 
        if(desc.innerHTML != "" || desc.innerHTML != " "){
            desc.innerHTML=""
        }
        if(widget.classList.contains("hidden") == false){
            widget.classList.add("hidden")
        }
        if(mapDiv.classList.contains("hidden") == false){
            mapDiv.classList.add("hidden")
        }
        // Fetch Api and return an object
        fetch(`https://api.waqi.info/feed/${city}/?token=${token}`).then(response =>{ return response.json()
    }).then(result =>{
            //Declare result and add hidden class to spinner remove hidden class to widget and map
            spinner.classList.add("hidden")
            widget.classList.remove("hidden")
            mapDiv.classList.remove("hidden")
            let cityName = result.data.city.name
            let cityAqi = result.data.aqi
            let geo = result.data.city.geo
            marker = L.marker(geo)
            // Display Result and reset form
            input.value = ""
            h1.innerHTML = cityName
            aqi.innerHTML = cityAqi
            widgetChange(cityAqi)
            marker.addTo(map)
            map.setView(geo , 13)
        }).catch(err=>{
            //Add hidden class to spinner and map, remove hidden class to widget and change bg color, display error
            spinner.classList.add("hidden")
            h1.innerHTML= "Error/City not found❌ Try Again!"
            aqi.innerHTML = ""
            desc.innerHTML = ""
            widget.classList.remove("hidden")
            widget.style.backgroundColor="whitesmoke"
            mapDiv.classList.add("hidden")
        })
})

// GEOLOCATION AQI

let options = {
    enableHighAccuracy : true,
}
function success (pos){
    //Declare coordinates and toggle hidden class to spinner
    let crd = pos.coords
    spinner.classList.toggle("hidden")
     // Check if H1,AQI,widget,desc and mapDiv aren't empty
     if(h1.innerHTML != "" || h1.innerHTML != " "){
        h1.innerHTML=""
    } 
    if(aqi.innerHTML != "" || aqi.innerHTML != " "){
        aqi.innerHTML=""
    } 
    if(desc.innerHTML != "" || desc.innerHTML != " "){
        desc.innerHTML=""
    }
    if(widget.classList.contains("hidden") == false){
        widget.classList.add("hidden")
    }
    if(mapDiv.classList.contains("hidden") == false){
        mapDiv.classList.add("hidden")
    }
    //Fetch api and return object
   fetch(`https://api.waqi.info/feed/geo:${crd.latitude};${crd.longitude}/?token=${token}`).then(response =>{
       return response.json()
   }).then(result => {
    //Add hidden class to spinner and remove hidden class to map and widget
    spinner.classList.add("hidden")
    mapDiv.classList.remove("hidden")
    widget.classList.remove("hidden")
    //Declare result
    let cityName = result.data.city.name
    let cityAqi = result.data.aqi
    let geo = result.data.city.geo
    marker = L.marker(geo)
    //Display Result and reset form
    input.value = ""
    h1.innerHTML = cityName
    aqi.innerHTML = cityAqi
    widgetChange(cityAqi)
    marker.addTo(map)
    map.setView(geo , 13)
   })
}
function error(err){
    //Add hidden class to spinner and map, remove hidden class to widget and Display error
    aqi.innerHTML = ""
    desc.innerHTML = ""
    spinner.classList.add("hidden")
    h1.innerHTML = "Geolocation's permission denied❌"
    widget.classList.remove("hidden")
    widget.style.backgroundColor="whitesmoke"
    mapDiv.classList.add("hidden")
}
// Geolocation request
document.querySelector(".geo").addEventListener("click" , ()=>{
    navigator.geolocation.getCurrentPosition(success , error, options)
})
// FUNCTION
function widgetChange(aqi){
    if(aqi <= 50){
        widget.style.backgroundColor = "#009966"
        desc.innerHTML="Air quality is considered satisfactory, and air pollution poses little or no risk"
    }
    else if(aqi <= 51 || aqi <=100){
        widget.style.backgroundColor = "#ffde33"
        desc.innerHTML="Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    }
    else if(aqi <= 101 || aqi <=150){
        widget.style.backgroundColor = "#ff9933"
        desc.innerHTML="Members of sensitive groups may experience health effects. The general public is not likely to be affected."
    }
    else if(aqi <= 151 || aqi <=200){
        widget.style.backgroundColor = "#cc0033"
        desc.innerHTML="Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects"
    }
    else if(aqi <= 201 || aqi <=300){
        widget.style.backgroundColor = "#660099"
        desc.innerHTML="Health warnings of emergency conditions. The entire population is more likely to be affected."
    }
    else if(aqi > 300){
        widget.style.backgroundColor = "#7e0023"
        desc.innerHTML="Health alert: everyone may experience more serious health effects"
    }
    
}
