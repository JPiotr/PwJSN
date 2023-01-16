const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(a+b);
        }, 100)
    })
}

async function addNumbersWMark(a,b) {
    return await asyncAdd(a,b).catch((err) => {
        console.error(err);
        return 0;
    });
}
let AsyncTimes = [];
let AsyncNames = [];
let nums = [];
let addedNums = [];
async function addMultipleNumbers(i,p){
    if(nums.length > 1){
        nums = [];
    }
    addedNums = []
    const ii = parseInt(i)
    x = p%2;
    let temp = generateNumbers(ii);
    let nDataSet = {};
    if(x===0){
        nDataSet = {
            label: "dataSet"+(p+1),
            data: temp,
            backgroundColor: "rgba(6,253,167,0.7)",
            borderColor: "rgba(6,253,167,0.4)",
        }
    }
    else{
        nDataSet = {
            label: "dataSet"+(p+1),
            data: temp,
            backgroundColor: "rgba(228,6,253,0.7)",
            borderColor: "rgba(228,6,253,0.4)",
        }
    }
    chartt5.data.datasets.push(nDataSet)
    chartt5.update();
    nums.push(temp)
    chartt5.update();

    performance.mark("multipleAddStart")
    for(let y = 0;y<ii;y++){
        addedNums.push(await addNumbersWMark(nums[0][y], nums[1][y])
            .then((x)=> x))
    }
    performance.mark("multipleAddEnd")
    // console.log(addedNums)
    // console.log(performance.measure("multipleAdd","multipleAddStart","multipleAddEnd"))

    return addedNums
}

function generateNumbers(i){
    let nums = []
    for(let j = 0;j<i;j++){
        nums.push(Math.floor(Math.random() * (100-1) + 1))
    }
    // console.log(nums)
    return nums;
}

function generateLabels(i){
    for (let j = 0; j < i; j++) {
        labels.push("data"+(j+1));
    }
}
function genLabels2(i){
    for (let j = 1; j < i; j+=2) {
        AsyncNames.push("AddedNums"+(((j+1)/2)))
    }
}
async function onStart() {
    let y = document.querySelector("#dataSize").value;
    let x = document.querySelector("#asyncStep").value;
    x *= 2;
    generateLabels(y);
    genLabels2(x);
    for (let p = 0; p < x; p++) {
        //1 arg ile liczb losowych generować
        //2 arg ile zestawow danych generowac
        await addMultipleNumbers(y, p).then(
            (finnaly) => {
                AsyncTimes.push(performance.measure("multipleAdd","multipleAddStart","multipleAddEnd").duration/1000)
                // console.log(finnaly)
                let nDataSet = {
                    label: "AddedNums"+(((p+1)/2)),
                    data: finnaly,
                    backgroundColor: "rgba(253,220,6,0.9)",
                    borderColor: "rgba(253,220,6,0.7)",
                }
                chartt5.data.datasets.push(nDataSet)
                chartt5.update();

                let n2DataSet = {
                    label: "Time",
                    data: AsyncTimes
                }
                if(chartt5Times.data.datasets.length != 0){
                    chartt5Times.data.datasets.pop()
                }
                chartt5Times.data.datasets.push(n2DataSet);
                chartt5Times.update();
            }
        ).catch((x) => 0)

    }
}

async function StartAsync(){
    labels = [];
    AsyncNames = [];

    chartt5.destroy()
    chartt5Times.destroy();

    data = {
        labels: labels
    }
    data2 = {
        labels: AsyncNames
    }

    config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Async operations'
                },
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Data Point'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        },
    }
    config2 = {
        type: 'line',
        data: data2,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Async operations Time'
                },
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Name'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value (s)'
                    }
                }
            }
        },
    }

    chartt5 = new Chart(chart5ctx,config);
    chartt5Times = new Chart(chart5ctxTime,config2);

    await onStart().then();
}

// Chart
let labels = []
let data = {
    labels: labels
}
let data2 = {
    labels: AsyncNames
}
let chart5ctx = document.querySelector("#chart5")
let chart5ctxTime = document.querySelector("#chart5Times")
let config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Async operations'
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Data Point'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    },
}
let config2 = {
    type: 'line',
    data: data2,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Async operations Time'
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Name'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value (s)'
                }
            }
        }
    },
}
let chartt5 = new Chart(chart5ctx,config)
let chartt5Times = new Chart(chart5ctxTime,config2)

let asyncStart = document.querySelector("#startAsync");
asyncStart.addEventListener("click",StartAsync)