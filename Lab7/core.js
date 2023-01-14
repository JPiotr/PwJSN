const ctx = document.querySelector('#chart');
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