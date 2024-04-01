//Author - Nitin Saraswat
var data;
var savedCenterList = [];

// Defining async function
async function getapi(mode = "normal") {
  document.getElementById("search").value = "";

  // api url
  const url = "https://isro.vercel.app/api/centres";

  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  data = await response.json();
  if (response) {
    hideloader();
  }

  //Calling show function to show data in HTML table
  if (mode === "saved") showSaved(data);
  else show(data);
}

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loadingSpan").style.display = "none";
}

// Function to define innerHTML for HTML table
function show(data) {
  let tab = "";
  let i = 1;

  // Loop to access all rows
  for (let r of data.centres) {
    tab += `<tr scope="row" id="${r.id}">
    <td>${r.id} </td>
	<td>${r.name} </td>
	<td>${r.Place}</td>
	<td>${r.State}</td>
  <td><button type="button" id="toSave-${i}" class="btn btn-primary flag-btn" onclick="saveCenter('toSave-${i++}', ${
      r.id
    })">Save Center</button></td>
</tr>`;
  }

  // Setting innerHTML as tab variable
  document.getElementById("isroCenters-body").innerHTML = tab;
}

//Setting Flag Buttons
const flagBtns = document.querySelectorAll(".flag-btn");
let flag = "name";

flagBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeFocus();
    if (btn.id === "savedCenters") getapi("saved");
    else getapi();
    btn.classList.add("focus");
    flag = btn.id;
  });
});

//Function to remove focus class from all buttons
function removeFocus() {
  const allElements = document.querySelectorAll(".btn");
  allElements.forEach((element) => {
    element.classList.remove("focus");
  });
}

//Search Button Event
document.getElementById("search-button").addEventListener("click", (event) => {
  searchData(event);
});

//Function for searching center by name
function searchData(event) {
  event.preventDefault();
  var val = document.getElementById("search").value;
  if (flag === "name") {
    searchByName(val);
  } else if (flag === "city") {
    searchByCity(val);
  } else if (flag === "state") {
    searchByState(val);
  }
}

//Funtion for searching center by name
function searchByName(val) {
  let tab = "",
    i = 1;

  for (let r of data.centres) {
    if (r.name.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr scope="row">
				<td>${i++} </td>
				<td>${r.name} </td>
				<td>${r.Place}</td>
				<td>${r.State}</td>
			</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters-body").innerHTML = tab;
}

//Funtion for searching center by state
function searchByState(val) {
  let tab = "",
    i = 1;
  for (let r of data.centres) {
    if (r.State.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr scope="row">
			<td>${i++} </td>
			<td>${r.name} </td>
			<td>${r.Place}</td>
			<td>${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters-body").innerHTML = tab;
}

//Funtion for searching center by city
function searchByCity(val) {
  let tab = "",
    i = 1;

  for (let r of data.centres) {
    if (r.Place.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr scope="row">
			<td>${i++} </td>
			<td>${r.name} </td>
			<td>${r.Place}</td>
			<td>${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }
  document.getElementById("isroCenters-body").innerHTML = tab;
}

function saveCenter(buttionId, rowId) {
  button = document.getElementById(buttionId);
  button.classList.remove("btn-primary");
  button.classList.add("btn-success");
  button.textContent = "Saved";
  if (!savedCenterList.includes(rowId)) savedCenterList.push(rowId);
  console.log(savedCenterList);
}

function showSaved(data) {
  debugger;
  let tab = "";
  let i = 1;

  // Loop to access all rows
  for (let r of data.centres) {
    if (savedCenterList.includes(r.id)) {
      tab += `<tr scope="row" id="${r.id}">
      <td>${r.id} </td>
    <td>${r.name} </td>
    <td>${r.Place}</td>
    <td>${r.State}</td>
    <td><button type="button" id="toSave-${i}" class="btn btn-primary flag-btn" onclick="saveCenter('toSave-${i}', ${r.id})">Save Center</button></td>
  </tr>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("isroCenters-body").innerHTML = tab;
  }
}
