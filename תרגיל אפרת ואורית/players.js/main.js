console.log('hi');
document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() {
    const urlPeopleByName = 'https://swapi.dev/api/people?search=Luke Skywalker';
    createGetRequest(urlPeopleByName, showPersonDetails);
    const urlFilms = 'https://swapi.dev/api/films';
    createGetRequest(urlFilms, showFilms);
    const urlFilmsSpecific = 'https://swapi.dev/api/people?search=Darth Vader';
    createGetRequest(urlFilmsSpecific, showFilmsSpecific);
}

function createGetRequest(url, showFunc) {
    const request = new XMLHttpRequest();
    request.responseType = 'json'; //application/json
    request.addEventListener('readystatechange', () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            showFunc(request.response);
        }
    });
    request.open('GET', url);
    request.send();
}

function showPersonDetails(response) {
    let people = response.results;
    let h1 = document.createElement('h1');
    h1.innerHTML = `${people[0].eye_color} ${people[0].height}`;
    document.body.append(h1);
}

function showFilms(response) {
    let films = response.results;
    const nextUrl = response.next;
    let filmsList = document.getElementById('films-list');
    films.forEach(element => {
        x= `${element.director}`;
        if(x==="George Lucas")
        {
        let li = document.createElement('li');
        li.innerHTML = `${element.title}`;
        filmsList.append(li);
        }
       
    });
    next = nextUrl;
    if (nextUrl) {
        createGetRequest(nextUrl);
    }
}
function showFilmsSpecific(response){
    let person = response.results;
    let films = person[0].films;
    films.forEach(element => {
        
        createGetRequest(element , showNameFilms);
    });
}
function showNameFilms(response) {
    let film = response;
    let nameList = document.getElementById('Name-list');
    let li = document.createElement('li');
    li.innerHTML = `${film.title}`;
    nameList.append(li);
}