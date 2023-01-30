const ctx = document.querySelector('#chart');
const searchBtn = document.querySelector('#lab7searchBtn');
const search = document.querySelector('#lab7search');

let cardNow = document.querySelector('#cardNow');
let cTime = cardNow.querySelector('.Time');
let cImg = cardNow.querySelector('img');
let cPlace = cardNow.querySelector('.Place');
let cTemp = cardNow.querySelector('.CTemp');
let odTemp = cardNow.querySelector('.OdTemp');
let maxTemp = cardNow.querySelector('.MaxTemp');
let minTemp = cardNow.querySelector('.MinTemp');
let cCisnienie = cardNow.querySelector('.Cisnienie');
let cWilg = cardNow.querySelector('.Wilgotnosc');

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
const GeoUrl = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0&namePrefix=";
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

async function fetchGeoData(URL){
    await GetData(URL).then((full)=>{
        if(!full.isNullOrUndef){
            if(GeoDataHis.length < 10){
                GeoDataHis.push(full.data[0]);
            }
            else{
                GeoDataHis.reverse();
                GeoDataHis.pop()
                GeoDataHis.reverse();
                GeoDataHis.push(full.data[0])
            }
            fetchWheaterData();
            console.table(full.data[0])
        }
    }).catch(reason => {
        console.log(reason)
    })
}

//WheaterApi
const baseIcon = "http://openweathermap.org/img/wn/10d@2x.png"
async function fetchWheaterData(){

    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
        GeoDataHis[GeoDataHis.length-1].latitude +
        "&lon=" +
        GeoDataHis[GeoDataHis.length-1].longitude +
        "&appid=af27394607243e5bdafa84c6d23ddee5&units=metric"
    await GetData(url).then((full)=>{
        console.log(full)
        let d = new Date(Date.now());
        cTime.innerHTML = d.getHours() + ':' + d.getMinutes();
        cTemp.innerHTML = "Temperatura: "+ full.main.temp +" C";
        odTemp.innerHTML = "Odczuwalna: "+ full.main.feels_like +" C";
        maxTemp.innerHTML = "Max: "+ full.main.temp_max +" C";
        minTemp.innerHTML = "Min: "+ full.main.temp_min +" C";
        cCisnienie.innerHTML = "Ciśnienie: " + full.main.pressure + " HPa";
        cWilg.innerHTML = "Wilgotność: " + full.main.humidity + " %";
        cImg.src = "http://openweathermap.org/img/wn/"+ full.weather[0].icon + "@2x.png"
        cPlace.innerHTML = full.name;

    })
}

searchBtn.addEventListener("click",()=>{
    fetchGeoData(GeoUrl+search.value);

})
