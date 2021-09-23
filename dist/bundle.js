/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/

//Declare Variables
let token = "f3b853747c4aae5d2ccfcc0be49dae49ff4aac72"
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFhO0FBQ2I7QUFDQSxZQUFZLDBDQUFtQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLE1BQU07QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxLQUFLLFVBQVUsTUFBTSxxQkFBcUI7QUFDdEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsY0FBYyxFQUFFLGNBQWMsVUFBVSxNQUFNO0FBQ3pGO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXFkLy4vYXNzZXRzL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLy9EZWNsYXJlIFZhcmlhYmxlc1xyXG5sZXQgdG9rZW4gPSBwcm9jZXNzLmVudi5BUElfS0VZXHJcbmxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1idXR0b25cIilcclxubGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0td3JhcFwiKVxyXG5sZXQgaDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmgxLWNpdHlcIilcclxubGV0IGFxaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaDEtYXFpXCIpXHJcbmxldCBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGlubmVyLWJvcmRlclwiKVxyXG5sZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRcIilcclxubGV0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2MtdGV4dFwiKVxyXG5sZXQgbWFwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIilcclxubGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpXHJcbi8vIE1hcCBpbml0XHJcbmxldCBtYXAgPSBMLm1hcCgnbWFwJyk7XHJcbmxldCBtYXJrZXI7XHJcbmxldCBhdHRyaWJ1dGlvbiA9ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vYXFpY24ub3JnL2hvbWUvXCI+QVFJQ048L2E+J1xyXG5sZXQgdGlsZVVybCA9IGBodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZz90b2tlbj0ke3Rva2VufWBcclxubGV0IHRpbGVzID0gTC50aWxlTGF5ZXIodGlsZVVybCwgeyBcclxuICAgIGF0dHJpYnV0aW9uLFxyXG4gICAgbWF4Wm9vbTogMTMsXHJcbiAgICBtaW5ab29tOiAxMyxcclxuICAgIHpvb21Db250cm9sOiBmYWxzZVxyXG59KVxyXG5tYXAucmVtb3ZlQ29udHJvbChtYXAuem9vbUNvbnRyb2wpXHJcbnRpbGVzLmFkZFRvKG1hcClcclxuLy8gSU5QVVQgQVFJXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiICwgKGUpPT57XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvLyBUYWtlIGNpdHkgVmFsdWUgYW5kIHJlbW92ZSBoaWRkZW4gY2xhc3MgdG8gc3Bpbm5lclxyXG4gICAgICAgIGxldCBjaXR5ID0gaW5wdXQudmFsdWVcclxuICAgICAgICBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcclxuICAgICAgICAvLyBDaGVjayBpZiBIMSxBUUksd2lkZ2V0LGRlc2MgYW5kIG1hcERpdiBhcmVuJ3QgZW1wdHlcclxuICAgICAgICBpZihoMS5pbm5lckhUTUwgIT0gXCJcIiB8fCBoMS5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgICAgICBoMS5pbm5lckhUTUw9XCJcIlxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoYXFpLmlubmVySFRNTCAhPSBcIlwiIHx8IGFxaS5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgICAgICBhcWkuaW5uZXJIVE1MPVwiXCJcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGRlc2MuaW5uZXJIVE1MICE9IFwiXCIgfHwgZGVzYy5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgICAgICBkZXNjLmlubmVySFRNTD1cIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHdpZGdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtYXBEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgbWFwRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRmV0Y2ggQXBpIGFuZCByZXR1cm4gYW4gb2JqZWN0XHJcbiAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLndhcWkuaW5mby9mZWVkLyR7Y2l0eX0vP3Rva2VuPSR7dG9rZW59YCkudGhlbihyZXNwb25zZSA9PnsgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSkudGhlbihyZXN1bHQgPT57XHJcbiAgICAgICAgICAgIC8vRGVjbGFyZSByZXN1bHQgYW5kIGFkZCBoaWRkZW4gY2xhc3MgdG8gc3Bpbm5lciByZW1vdmUgaGlkZGVuIGNsYXNzIHRvIHdpZGdldCBhbmQgbWFwXHJcbiAgICAgICAgICAgIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxyXG4gICAgICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxyXG4gICAgICAgICAgICBtYXBEaXYuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxyXG4gICAgICAgICAgICBsZXQgY2l0eU5hbWUgPSByZXN1bHQuZGF0YS5jaXR5Lm5hbWVcclxuICAgICAgICAgICAgbGV0IGNpdHlBcWkgPSByZXN1bHQuZGF0YS5hcWlcclxuICAgICAgICAgICAgbGV0IGdlbyA9IHJlc3VsdC5kYXRhLmNpdHkuZ2VvXHJcbiAgICAgICAgICAgIG1hcmtlciA9IEwubWFya2VyKGdlbylcclxuICAgICAgICAgICAgLy8gRGlzcGxheSBSZXN1bHQgYW5kIHJlc2V0IGZvcm1cclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgIGgxLmlubmVySFRNTCA9IGNpdHlOYW1lXHJcbiAgICAgICAgICAgIGFxaS5pbm5lckhUTUwgPSBjaXR5QXFpXHJcbiAgICAgICAgICAgIHdpZGdldENoYW5nZShjaXR5QXFpKVxyXG4gICAgICAgICAgICBtYXJrZXIuYWRkVG8obWFwKVxyXG4gICAgICAgICAgICBtYXAuc2V0VmlldyhnZW8gLCAxMylcclxuICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAgICAgLy9BZGQgaGlkZGVuIGNsYXNzIHRvIHNwaW5uZXIgYW5kIG1hcCwgcmVtb3ZlIGhpZGRlbiBjbGFzcyB0byB3aWRnZXQgYW5kIGNoYW5nZSBiZyBjb2xvciwgZGlzcGxheSBlcnJvclxyXG4gICAgICAgICAgICBzcGlubmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcclxuICAgICAgICAgICAgaDEuaW5uZXJIVE1MPSBcIkVycm9yL0NpdHkgbm90IGZvdW5k4p2MIFRyeSBBZ2FpbiFcIlxyXG4gICAgICAgICAgICBhcWkuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICBkZXNjLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcclxuICAgICAgICAgICAgd2lkZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvcj1cIndoaXRlc21va2VcIlxyXG4gICAgICAgICAgICBtYXBEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxyXG4gICAgICAgIH0pXHJcbn0pXHJcblxyXG4vLyBHRU9MT0NBVElPTiBBUUlcclxuXHJcbmxldCBvcHRpb25zID0ge1xyXG4gICAgZW5hYmxlSGlnaEFjY3VyYWN5IDogdHJ1ZSxcclxufVxyXG5mdW5jdGlvbiBzdWNjZXNzIChwb3Mpe1xyXG4gICAgLy9EZWNsYXJlIGNvb3JkaW5hdGVzIGFuZCB0b2dnbGUgaGlkZGVuIGNsYXNzIHRvIHNwaW5uZXJcclxuICAgIGxldCBjcmQgPSBwb3MuY29vcmRzXHJcbiAgICBzcGlubmVyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIilcclxuICAgICAvLyBDaGVjayBpZiBIMSxBUUksd2lkZ2V0LGRlc2MgYW5kIG1hcERpdiBhcmVuJ3QgZW1wdHlcclxuICAgICBpZihoMS5pbm5lckhUTUwgIT0gXCJcIiB8fCBoMS5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgIGgxLmlubmVySFRNTD1cIlwiXHJcbiAgICB9IFxyXG4gICAgaWYoYXFpLmlubmVySFRNTCAhPSBcIlwiIHx8IGFxaS5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgIGFxaS5pbm5lckhUTUw9XCJcIlxyXG4gICAgfSBcclxuICAgIGlmKGRlc2MuaW5uZXJIVE1MICE9IFwiXCIgfHwgZGVzYy5pbm5lckhUTUwgIT0gXCIgXCIpe1xyXG4gICAgICAgIGRlc2MuaW5uZXJIVE1MPVwiXCJcclxuICAgIH1cclxuICAgIGlmKHdpZGdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikgPT0gZmFsc2Upe1xyXG4gICAgICAgIHdpZGdldC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXHJcbiAgICB9XHJcbiAgICBpZihtYXBEaXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpID09IGZhbHNlKXtcclxuICAgICAgICBtYXBEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxyXG4gICAgfVxyXG4gICAgLy9GZXRjaCBhcGkgYW5kIHJldHVybiBvYmplY3RcclxuICAgZmV0Y2goYGh0dHBzOi8vYXBpLndhcWkuaW5mby9mZWVkL2dlbzoke2NyZC5sYXRpdHVkZX07JHtjcmQubG9uZ2l0dWRlfS8/dG9rZW49JHt0b2tlbn1gKS50aGVuKHJlc3BvbnNlID0+e1xyXG4gICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICB9KS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvL0FkZCBoaWRkZW4gY2xhc3MgdG8gc3Bpbm5lciBhbmQgcmVtb3ZlIGhpZGRlbiBjbGFzcyB0byBtYXAgYW5kIHdpZGdldFxyXG4gICAgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXHJcbiAgICBtYXBEaXYuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKVxyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcclxuICAgIC8vRGVjbGFyZSByZXN1bHRcclxuICAgIGxldCBjaXR5TmFtZSA9IHJlc3VsdC5kYXRhLmNpdHkubmFtZVxyXG4gICAgbGV0IGNpdHlBcWkgPSByZXN1bHQuZGF0YS5hcWlcclxuICAgIGxldCBnZW8gPSByZXN1bHQuZGF0YS5jaXR5Lmdlb1xyXG4gICAgbWFya2VyID0gTC5tYXJrZXIoZ2VvKVxyXG4gICAgLy9EaXNwbGF5IFJlc3VsdCBhbmQgcmVzZXQgZm9ybVxyXG4gICAgaW5wdXQudmFsdWUgPSBcIlwiXHJcbiAgICBoMS5pbm5lckhUTUwgPSBjaXR5TmFtZVxyXG4gICAgYXFpLmlubmVySFRNTCA9IGNpdHlBcWlcclxuICAgIHdpZGdldENoYW5nZShjaXR5QXFpKVxyXG4gICAgbWFya2VyLmFkZFRvKG1hcClcclxuICAgIG1hcC5zZXRWaWV3KGdlbyAsIDEzKVxyXG4gICB9KVxyXG59XHJcbmZ1bmN0aW9uIGVycm9yKGVycil7XHJcbiAgICAvL0FkZCBoaWRkZW4gY2xhc3MgdG8gc3Bpbm5lciBhbmQgbWFwLCByZW1vdmUgaGlkZGVuIGNsYXNzIHRvIHdpZGdldCBhbmQgRGlzcGxheSBlcnJvclxyXG4gICAgYXFpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRlc2MuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXHJcbiAgICBoMS5pbm5lckhUTUwgPSBcIkdlb2xvY2F0aW9uJ3MgcGVybWlzc2lvbiBkZW5pZWTinYxcIlxyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcclxuICAgIHdpZGdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9XCJ3aGl0ZXNtb2tlXCJcclxuICAgIG1hcERpdi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXHJcbn1cclxuLy8gR2VvbG9jYXRpb24gcmVxdWVzdFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdlb1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiAsICgpPT57XHJcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MgLCBlcnJvciwgb3B0aW9ucylcclxufSlcclxuLy8gRlVOQ1RJT05cclxuZnVuY3Rpb24gd2lkZ2V0Q2hhbmdlKGFxaSl7XHJcbiAgICBpZihhcWkgPD0gNTApe1xyXG4gICAgICAgIHdpZGdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDk5NjZcIlxyXG4gICAgICAgIGRlc2MuaW5uZXJIVE1MPVwiQWlyIHF1YWxpdHkgaXMgY29uc2lkZXJlZCBzYXRpc2ZhY3RvcnksIGFuZCBhaXIgcG9sbHV0aW9uIHBvc2VzIGxpdHRsZSBvciBubyByaXNrXCJcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXFpIDw9IDUxIHx8IGFxaSA8PTEwMCl7XHJcbiAgICAgICAgd2lkZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZGUzM1wiXHJcbiAgICAgICAgZGVzYy5pbm5lckhUTUw9XCJBaXIgcXVhbGl0eSBpcyBhY2NlcHRhYmxlOyBob3dldmVyLCBmb3Igc29tZSBwb2xsdXRhbnRzIHRoZXJlIG1heSBiZSBhIG1vZGVyYXRlIGhlYWx0aCBjb25jZXJuIGZvciBhIHZlcnkgc21hbGwgbnVtYmVyIG9mIHBlb3BsZSB3aG8gYXJlIHVudXN1YWxseSBzZW5zaXRpdmUgdG8gYWlyIHBvbGx1dGlvbi5cIlxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihhcWkgPD0gMTAxIHx8IGFxaSA8PTE1MCl7XHJcbiAgICAgICAgd2lkZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmOTkzM1wiXHJcbiAgICAgICAgZGVzYy5pbm5lckhUTUw9XCJNZW1iZXJzIG9mIHNlbnNpdGl2ZSBncm91cHMgbWF5IGV4cGVyaWVuY2UgaGVhbHRoIGVmZmVjdHMuIFRoZSBnZW5lcmFsIHB1YmxpYyBpcyBub3QgbGlrZWx5IHRvIGJlIGFmZmVjdGVkLlwiXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFxaSA8PSAxNTEgfHwgYXFpIDw9MjAwKXtcclxuICAgICAgICB3aWRnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjY2MwMDMzXCJcclxuICAgICAgICBkZXNjLmlubmVySFRNTD1cIkV2ZXJ5b25lIG1heSBiZWdpbiB0byBleHBlcmllbmNlIGhlYWx0aCBlZmZlY3RzOyBtZW1iZXJzIG9mIHNlbnNpdGl2ZSBncm91cHMgbWF5IGV4cGVyaWVuY2UgbW9yZSBzZXJpb3VzIGhlYWx0aCBlZmZlY3RzXCJcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXFpIDw9IDIwMSB8fCBhcWkgPD0zMDApe1xyXG4gICAgICAgIHdpZGdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM2NjAwOTlcIlxyXG4gICAgICAgIGRlc2MuaW5uZXJIVE1MPVwiSGVhbHRoIHdhcm5pbmdzIG9mIGVtZXJnZW5jeSBjb25kaXRpb25zLiBUaGUgZW50aXJlIHBvcHVsYXRpb24gaXMgbW9yZSBsaWtlbHkgdG8gYmUgYWZmZWN0ZWQuXCJcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXFpID4gMzAwKXtcclxuICAgICAgICB3aWRnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjN2UwMDIzXCJcclxuICAgICAgICBkZXNjLmlubmVySFRNTD1cIkhlYWx0aCBhbGVydDogZXZlcnlvbmUgbWF5IGV4cGVyaWVuY2UgbW9yZSBzZXJpb3VzIGhlYWx0aCBlZmZlY3RzXCJcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==