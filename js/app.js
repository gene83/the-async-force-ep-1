'use strict';

const p4Req = new XMLHttpRequest();

function p4ReqListener() {
  const p4Obj = JSON.parse(this.responseText);
  const p4NameHeader = document.querySelector('#person4Name');
  p4NameHeader.innerHTML = p4Obj.name;

  const p4HomeReq = new XMLHttpRequest();

  function p4HomeReqListener() {
    const p4Home = JSON.parse(this.responseText);
    const p4HomeHeader = document.querySelector('#person4HomeWorld');
    p4HomeHeader.innerHTML = p4Home.name;
  }

  p4HomeReq.addEventListener('load', p4HomeReqListener);
  p4HomeReq.open('get', p4Obj.homeworld);
  p4HomeReq.send();
}

p4Req.addEventListener('load', p4ReqListener);
p4Req.open('GET', 'https://swapi.co/api/people/4/');
p4Req.send();

const p14Req = new XMLHttpRequest();

function p14ReqListener() {
  const p14Obj = JSON.parse(this.responseText);
  const p14NameHeader = document.querySelector('#person14Name');
  p14NameHeader.innerHTML = p14Obj.name;

  const p14SpeciesReq = new XMLHttpRequest();

  function p14SpeciesReqListener() {
    const p14Species = JSON.parse(this.responseText);
    const p14SpeciesHeader = document.querySelector('#person14Species');
    p14SpeciesHeader.innerHTML = p14Species.name;
  }

  p14SpeciesReq.addEventListener('load', p14SpeciesReqListener);
  p14SpeciesReq.open('get', p14Obj.species);
  p14SpeciesReq.send();
}

p14Req.addEventListener('load', p14ReqListener);
p14Req.open('get', 'https://swapi.co/api/people/14/');
p14Req.send();

const filmReq = new XMLHttpRequest();

function filmReqListener() {
  const films = JSON.parse(this.responseText).results;
  const filmList = document.querySelector('#filmList');

  for (let i = 0; i < films.length; i++) {
    const filmItem = document.createElement('li');
    const filmHeader = document.createElement('h2');

    filmItem.class = 'film';
    filmHeader.class = 'filmTitle';
    filmList.appendChild(filmItem);
    filmItem.appendChild(filmHeader);
    filmHeader.innerHTML = films[i].title;

    const planetsHeader = document.createElement('h3');
    const filmPlanets = document.createElement('ul');

    filmPlanets.class = 'filmPlanets';
    planetsHeader.innerHTML = 'Planets';

    filmItem.appendChild(planetsHeader);
    filmItem.appendChild(filmPlanets);

    for (let j = 0; j < films[i].planets.length; j++) {
      const planetReq = new XMLHttpRequest();

      function planetReqListener() {
        const planetObj = JSON.parse(this.responseText);
        const planet = document.createElement('li');
        const planetName = document.createElement('h4');

        planet.class = 'planet';
        planetName.class = 'planetName';
        planetName.innerHTML = planetObj.name;

        filmPlanets.appendChild(planet);
        planet.appendChild(planetName);
      }

      planetReq.addEventListener('load', planetReqListener);
      planetReq.open('get', films[i].planets[j]);
      planetReq.send();
    }
  }
}

filmReq.addEventListener('load', filmReqListener);
filmReq.open('get', 'https://swapi.co/api/films/');
filmReq.send();
