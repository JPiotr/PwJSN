const ctx = document.querySelector('#chart');

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