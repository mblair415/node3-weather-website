// fetch('http://puzzle.mead.io/puzzle').then( response => {
//     response.json().then( data => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherData = document.querySelector('#weatherData');
const weatherDataError = document.querySelector('#weatherDataError');


weatherData.textContent = 'blah'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('search value ', search.value)

    fetch(`http://localhost:3000/weather?address=${search.value}`).then( response => {
        response.json().then( ( { error, city, description} = {} ) => {
            if (!error) {
                console.log({description, city})
                weatherData.textContent = 
            } else {
                console.log({error})
                weatherDataError.textContent = error;
            }
        });
    });
});

