const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipsdedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data); // changing to fulfilled
      } else {
        reject( Error(xhr.statusText) ); 
      }
    };
    xhr.onerror = () => reject ( Error('A network error occurered.') );
    xhr.send();
  });
  
}

function getProfiles(json) {
  const profiles = json.people.map(person => {

  if (person.name === "Anatoly Ivanishin") {
      person.name = "Anatoli_Ivanishin"
  }
  return getJSON(wikiUrl + person.name);
 });
 return Promise.all(profiles);
}

function generateHTML(data) {
  data.map( astronavt => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${astronavt.thumbnail.source}>
      <h2>${astronavt.title}</h2>
      <p>${astronavt.description}</p>
      <p>${astronavt.extract_html}</p>
     `;
    });
  }
  
  

btn.addEventListener('click', (event) => {
  event.target.textContent = 'Loading...'; // to show loading when btn clicked.


  getJSON(astrosUrl)
   .then(getProfiles)
   .then(generateHTML)
   .catch( err => {
    peopleList.innerHTML = '<h3>smth went wrong.</h3>';
    console.log(err)
   }  )
  .finally( () =>  event.target.remove() )

});