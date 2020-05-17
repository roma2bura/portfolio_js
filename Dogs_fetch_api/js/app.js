const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
//fetch wrapper
function fetchData(url) {
    return fetch(url)
        .then(checkStatus) // check status if fulfilled.
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error))
}

// is going to wait for both fetch promises to resolve before continuing and return into a single returned promise.
// or all promises successed or none of them do.

Promise.all ([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList); // creating funcs
    generateImage(randomImage); // creating funcs
})

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error (response.statusText));
    }
}


function generateOptions(data) {
    const options = data.map(item => `
        <option value='${item}'>${item}</option>
    `).join(''); // use map method to illiterate over the array and return an option element for each item in array.
    select.innerHTML = options; // to pass it
}


function generateImage(data) {
    const html = `
        <img src='${data}' alt>
        <p>Click to view images of ${select.value}s</p>
        `;
    card.innerHTML = html; // to passing it into card variable.
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

fetchData(`https://dog.ceo/api/breed/${breed}/images/random`) // use template literal to insert the value of breed variable to choose dog type
    .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click to view more ${breed}s`;
    })
}

// // ------------------------------------------
// //  EVENT LISTENERS
// // ------------------------------------------
select.addEventListener('change', fetchBreedImage); // when choosing a breed changes pic url
card.addEventListener('click', fetchBreedImage); // fetchbreed our callback 
form.addEventListener('submit', postData); // postData our callback

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
    e.preventDefault(); // cancel the browsers default submit behavor
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, comment: comment })
    }

    fetch('https://jsonplaceholder.typicode.com/comments', config)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data))
}
