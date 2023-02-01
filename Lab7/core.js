const ctx = document.querySelector('#chart');
const searchBtn = document.querySelector('#lab7searchBtn');
const search = document.querySelector('#lab7search');

let cardNow = document.querySelector('#cardNow');

let GeoDataHis = []
//api key af27394607243e5bdafa84c6d23ddee5
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'],
        datasets: [{
            label: 'Stopnie (C)',
            data: [12, 19, 3, 5, 2, 12, -3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//GeoApi
async function GetData(theUrl){
    return new Promise((resolve, reject)=>{
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.responseType = "json";
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                resolve(xmlHttp.response);
            }
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    })

}

//WheaterApi
const baseIcon = "http://openweathermap.org/img/wn/10d@2x.png"

class WeatherContainer {
    weatherDatas = []
    wheaterIds = 0;

    dom = document.createElement("div");


    constructor() {
        this.dom = document.querySelector("#cards");
    }

    addCard(card){
        this.weatherDatas.push(card);
        this.dom.appendChild(card.tempClone);
    }
}
//todo: Loading placeholder
class Weather{
    tempClone = document.createElement("div");
    searchedPlace = "";
    GeoUrl = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0&namePrefix=";

    wheaterData = {};
    geoData = {};
    constructor(search, id) {
        this.searchedPlace = search;

        this.tempClone  = cardNow.cloneNode(true);
        this.cTime      = this.tempClone.querySelector('.Time');
        this.cImg       = this.tempClone.querySelector('img');
        this.cPlace     = this.tempClone.querySelector('.Place');
        this.cTemp      = this.tempClone.querySelector('.CTemp');
        this.odTemp     = this.tempClone.querySelector('.OdTemp');
        this.maxTemp    = this.tempClone.querySelector('.MaxTemp');
        this.minTemp    = this.tempClone.querySelector('.MinTemp');
        this.cCisnienie = this.tempClone.querySelector('.Cisnienie');
        this.cWilg      = this.tempClone.querySelector('.Wilgotnosc');
        this.dCard      = this.tempClone.querySelector('.dCard');

        this.dCard.addEventListener('click',deleteCard);

        this.tempClone.id = "wCard"+id;
        this.tempClone.style.display = "flex";
        this.fetchGeoData()
    }

    async fetchGeoData(){
        await GetData(this.GeoUrl+this.searchedPlace).then((full)=>{
            if(!full.isNullOrUndef){
                this.geoData = full.data[0];
                this.fetchWheaterData();
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    async fetchWheaterData(){
        let url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
            this.geoData.latitude +
            "&lon=" +
            this.geoData.longitude +
            "&appid=af27394607243e5bdafa84c6d23ddee5&units=metric"
        await GetData(url).then((full)=>{
            let d = new Date(Date.now());
            this.cTime.innerHTML = d.getHours() + ':' + d.getMinutes();
            this.cTemp.innerHTML = "Temperatura: "+ full.main.temp +" C";
            this.odTemp.innerHTML = "Odczuwalna: "+ full.main.feels_like +" C";
            this.maxTemp.innerHTML = "Max: "+ full.main.temp_max +" C";
            this.minTemp.innerHTML = "Min: "+ full.main.temp_min +" C";
            this.cCisnienie.innerHTML = "Ciśnienie: " + full.main.pressure + " HPa";
            this.cWilg.innerHTML = "Wilgotność: " + full.main.humidity + " %";
            this.cImg.src = "http://openweathermap.org/img/wn/"+ full.weather[0].icon + "@2x.png"
            this.cPlace.innerHTML = full.name;
        })
    }
}

let WCont = new WeatherContainer();
cardNow.style.display = "none";

function deleteCard(){
    let card = WCont.weatherDatas.findIndex(x => x.tempClone.id === this.parentElement.id);
    // localMemo.removeItem(Notes.at(Notes.findIndex(x => x.dom.id === this.parentElement.parentElement.id)).Note.id.toString());
    WCont.dom.removeChild(WCont.weatherDatas[card].tempClone);
    WCont.weatherDatas.splice(card,1);
    updateNotesUI()
}

searchBtn.addEventListener("click",()=>{
    if(WCont.weatherDatas.length < 10){
        WCont.addCard(
            new Weather(search.value,WCont.wheaterIds)
        );
        WCont.wheaterIds++;
    }
    else{
        WCont.weatherDatas.reverse();
        WCont.weatherDatas.pop();
        WCont.weatherDatas.reverse();
        WCont.addCard(new Weather(search.value));
        WCont.wheaterIds++;
    }
})

window.addEventListener('beforeunload',(e)=>{
    e.preventDefault();
    if(window.localStorage.getItem("WeatherHis") != null || window.localStorage.getItem("WeatherHis").localeCompare(JSON.stringify(WCont))!==0){
        window.localStorage.removeItem("WeatherHis");
        window.localStorage.setItem("WeatherHis",JSON.stringify(WCont));
    }
})

function loadCards() {
    WCont.dom.innerHTML = "";
    let parsedObj = JSON.parse(window.localStorage.getItem("WeatherHis"))
    WCont.weatherDatas = [];
    WCont.wheaterIds = parsedObj.wheaterIds;
    parsedObj.weatherDatas.forEach(x=>WCont.addCard(new Weather(x.searchedPlace)));
    // WCont.wheaterDatas.forEach(x => x.fetchGeoData());
}

loadCards()