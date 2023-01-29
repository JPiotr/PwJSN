const ctx = document.querySelector('#chart');
const searchBtn = document.querySelector('#lab7searchBtn');
const search = document.querySelector('#lab7search');

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
async function GetGeoData(theUrl){
    return new Promise((resolve, reject)=>{
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = "json";
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                // console.table(xmlHttp.response);
                resolve(xmlHttp.response);
            }
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    })

}

async function fetchGeoData(URL){
    await GetGeoData(URL).then((full)=>{
        if(GeoDataHis.length < 10){
            GeoDataHis.push(full.data[0]);
        }
        else{
            GeoDataHis.reverse();
            GeoDataHis.pop()
            GeoDataHis.reverse();
            GeoDataHis.push(full.data[0])
        }
        console.table(full.data[0])
    }).catch(reason => {
        console.log(reason)
    })
}

searchBtn.addEventListener("click",()=>{
    fetchGeoData(GeoUrl+search.value);
})