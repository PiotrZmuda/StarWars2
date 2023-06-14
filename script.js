// window.onload = fetchData;

// const BASE_URL = "https://swapi.dev/api/";
// let currentCollectionData = null;

// class Base {
//   constructor(name, url, created) {
//     this.name = name;
//     this.url = url;
//     this.created = created;
//   }
//   whoAmI() {
//     console.log(`I am ${this.name}`);
//   }
// }

// class Vehicle extends Base {
//   constructor(
//     name,
//     url,
//     created,
//     cost_in_credits,
//     max_atmoshering_speed,
//     model
//   ) {
//     super(name, url, created);

//     this.cost_in_credits = cost_in_credits;
//     this.model = model;
//     this.max_atmoshering_speed = max_atmoshering_speed;
//     this.km = 0;
//     this.isDriving = null;
//   }

//   drive() {
//     this.isDriving = setInterval(() => {
//       this.km += this.max_atmoshering_speed;
//     }, 5000);
//   }

//   stop() {
//     clearInterval(this.isDriving);
//     console.log(`przejechałeś ${this.km}`);
//   }
// }
// //pobieranie kolekcji
// async function fetchCollection(collectionName) {
//   const response = await fetch(`${BASE_URL}${collectionName}`);
//   currentCollectionData = await response.json();
// }

// //pobieranie danych
// async function fetchData() {
//   const response = await fetch(BASE_URL);
//   const data = await response.json();
//   const buttons = document.getElementById("buttons");

//   const handleButtonClick = async (event) => {
//     const collectionName = event.target.innerHTML.toLowerCase();
//     await fetchCollection(collectionName);
//     const vehicleInstance = currentCollectionData.results.map(
//       ({ name, url, created, cost_in_credits, max_atmoshering_speed, model }) =>
//         new Vehicle(
//           name,
//           url,
//           created,
//           cost_in_credits,
//           max_atmoshering_speed,
//           model
//         )
//     );
//     console.log("currentCollectionData 2", vehicleInstance);

//     // tworzenie tabeli

//     const table = document.getElementById("list");
//     const tbody = document.createElement("tbody");
//     vehicleInstance.forEach((vehicle) => {
//       const tr = document.createElement("tr"); //3min

//       const td1 = document.createElement("td");
//       td1.innerHTML = vehicle.name;
//       tr.appendChild(td1);

//       const td2 = document.createElement("td");
//       td2.innerHTML = vehicle.model;
//       tr.appendChild(td2);

//       // table.appendChild(tr);
//       tbody.appendChild(tr);
//     });
//     table.appendChild(tbody);
//   };

//   //tworzenie przycisków

//   Object.entries(data).map(([key, value]) => {
//     console.log("entry", key, value);
//     const button = document.createElement("button");
//     button.innerHTML = key.toUpperCase();
//     button.onclick = handleButtonClick;
//     buttons.appendChild(button);
//   });

//   console.log("data", data);
// }

// //9min

window.onload = fetchData;

const BASE_URL = "https://swapi.dev/api/";
let currentCollectionData = null;
let currentTableBody = null;
page = 1;

// Funkcje obsługujące paginację
function prevPage() {
  console.log("prev-Click");
}

function nextPage() {
  console.log("next-Click");
}

function changePageNumber(event) {
  console.log("Page-Number", event.target.value);
}

function changePageSize(event) {
  console.log("Page-Size", event.target.value);
}

//Klasa bazowa
class Base {
  constructor(name, url, created) {
    this.name = name;
    this.url = url;
    this.created = created;
  }

  whoAmI() {
    console.log(`I am ${this.name}`);
  }
}

// Klasa Vehicle dziedzicząca po Base
class Vehicle extends Base {
  constructor(
    name,
    url,
    created,
    cost_in_credits,
    max_atmoshering_speed,
    model
  ) {
    super(name, url, created);

    this.cost_in_credits = cost_in_credits;
    this.model = model;
    this.max_atmoshering_speed = max_atmoshering_speed;
    this.km = 0;
    this.isDriving = null;
  }

  drive() {
    this.isDriving = setInterval(() => {
      this.km += this.max_atmoshering_speed;
    }, 5000);
  }

  stop() {
    clearInterval(this.isDriving);
    console.log(`przejechałeś ${this.km}`);
  }
}

class Planets extends Base {
  constructor( name,url,climate, terrain, diameter, created)
   
  { 
    super(name, url, created)

    this.name = name;
    this.climate = climate;
    this.terrain = terrain;
    this.diameter = diameter;
    this.created = created;
  }
}

// Pobieranie kolekcji
async function fetchCollection(collectionName) {
  // const response = await fetch(`${BASE_URL}${collectionName}`);
  const response = await fetch(`${BASE_URL}/${collectionName}/?page=${page}`)
  currentCollectionData = await response.json();
}

// Pobieranie danych
async function fetchData() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  const buttons = document.getElementById("buttons");

  const handleButtonClick = async (event) => {
    const collectionName = event.target.innerHTML.toLowerCase();
    await fetchCollection(collectionName);
    const vehicleInstance = currentCollectionData.results.map(
      ({ name, 
        url, 
        created, 
        cost_in_credits, 
        max_atmoshering_speed, 
        model
       }) =>
        new Vehicle(
          name,
          url,
          created,
          cost_in_credits,
          max_atmoshering_speed,
          model
        )
    );
    console.log("currentCollectionData 2", vehicleInstance);

    clearTable();
    createTable(vehicleInstance);
  };

  createButtons(data, buttons, handleButtonClick);

  console.log("data", data);
}

// Tworzenie przycisków
function createButtons(data, container, onClickHandler) {
  container.innerHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    console.log("entry", key, value);
    const button = document.createElement("button");
    button.innerHTML = key.toUpperCase();
    button.onclick = onClickHandler;
    container.appendChild(button);
  });
}

// Tworzenie tabeli
function createTable(data) {
  const table = document.getElementById("list");
  currentTableBody = document.createElement("tbody");
  data.forEach((vehicle2, index) => {
    const tr = document.createElement("tr");

    const idList = document.createElement("td");
    idList.innerHTML = index;
    tr.appendChild(idList);

    const td1 = document.createElement("td");
    td1.innerHTML = vehicle2.name;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerHTML = vehicle2.model;x
    // td2.innerHTML = vehicle2.climate;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerHTML = vehicle2.created
    tr.appendChild(td3);

    currentTableBody.appendChild(tr);
  });
  table.appendChild(currentTableBody);
}

// Czyszczenie tabeli
function clearTable() {
  if (currentTableBody) {
    currentTableBody.innerHTML = "";
  }
}
