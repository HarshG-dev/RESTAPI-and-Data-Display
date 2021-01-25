const USERSELECT = document.querySelector("#user-select");
const SHOWBUTTON = document.querySelector("#submit-btn");
const COUNTRYSELECT = document.querySelector("#country-select");
let loadIcon = document.querySelector("#loader-view");
let apiURL = "https://randomuser.me/api/?results=50";
let rawRecords = []; // Stores all records to use later


function displayAllRecords(data, countrySelected, genderSelected) {

	console.log('Displaying records#=', data.length, 'country = ', countrySelected, "gender = ", genderSelected);

	data.sort(function (a, b) {
		let c = a.location.country;
		let d = b.location.country;
		return (c.localeCompare(d, "en", {
			sensitivity: 'base'
		}));
	});

	let lastName = document.querySelector("#user-name");
	let countryName = document.querySelector("#user-balance");
	let picLink = document.querySelector("#picture");
	let fullNames = "";
	let userCountry = "";
	let pic = "";

	for (let i = 0; i < data.length; i++) {

		if ((countrySelected == -1 || countrySelected == data[i].location.country) && (genderSelected == -1 || genderSelected == data[i].gender)) {
			fullNames += '<p>' + data[i].name.first + " " + data[i].name.last + '</p>';
			userCountry += '<p>' + data[i].location.country + '</p>';
			pic += '<p><img src="' + data[i].picture.thumbnail + '"></p>';
		}
	}
	lastName.innerHTML = fullNames;
	countryName.innerHTML = userCountry;
	picLink.innerHTML = pic;
}

function countrySelectorInit(data) {
	var justCountries = [...new Set(data.map(x => x.location.country))];
	console.log('justCountries = ', justCountries);

	let allCountryValues = '<option selected disabled value="-1">Select Country</option>' + '<option value="-1">All</option>';

	for (let y = 0; y < justCountries.length; y++) {
		console.log("test", justCountries.length);
		allCountryValues += '<option value="' + justCountries[y] + '">' + justCountries[y] + '</option>';
	}
	console.log(allCountryValues);
	COUNTRYSELECT.innerHTML = allCountryValues;
}

function backendLoadAllData(responseURL) {
	console.log(responseURL);

	loadIcon.style.display = "block";

	fetch(responseURL)
		.then((resp) => resp.json())
		.then(function (respData) {
			console.log(respData.results.length);
			displayAllRecords(respData.results, -1, -1);
			countrySelectorInit(respData.results);
			rawRecords = respData.results;
		})
		.catch(function (error) {
			console.log(error);
		});

	loadIcon.style.display = "none";
}

function submitButtonClick() {
	let gender, country;

	gender = USERSELECT.options[USERSELECT.selectedIndex].value;
	console.log(gender);

	country = COUNTRYSELECT.options[COUNTRYSELECT.selectedIndex].value;
	console.log(country);

	displayAllRecords(rawRecords, country, gender);
}
// Register all event handlers
window.addEventListener("load", backendLoadAllData(apiURL));
SHOWBUTTON.addEventListener("click", submitButtonClick);
