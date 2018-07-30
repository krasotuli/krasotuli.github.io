// Client ID and API key from the Developer Console
var CLIENT_ID = '669257484182-3trne83s0imhd5apjqm8v0njc5svrb0b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCa42uIFut8a2NDqkXtQ-e3cDgRsIhneDU';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

//entry point
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

//Initializes the API client library and sets up sign-in state listeners.
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
  write();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function write() {
  var values = [
    [
      "UserSuper", "Qwerty"
    ]
  ];
  var body = {
    values: values
  };
  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: '1ORV0CFDXnwGDL3d67xBcVmQhOtNheLrRpeAsswXCI2g',
    range: 'person!D1:E',
     valueInputOption: "RAW",
     resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
  });
}
