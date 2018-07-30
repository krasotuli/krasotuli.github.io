// Client ID and API key from the Developer Console
var CLIENT_ID = '669257484182-3trne83s0imhd5apjqm8v0njc5svrb0b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCa42uIFut8a2NDqkXtQ-e3cDgRsIhneDU';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var registerButton = document.getElementById('btn_register');
var signoutButton = document.getElementById('signout-button');
var persons;
var table = document.getElementById('table_div');
var loginForm = document.getElementById('auth_form');

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
      signoutButton.onclick = logout;
      reloadPage();
  });
}

function reloadPage() {
  if (getCookie("username")) {
    table.style.display = 'block';
    loginForm.style.display = 'none';
    signoutButton.style.display = 'block';

    getAllOrders();
  } else {
    table.style.display = 'none';
    loginForm.style.display = 'block';
    signoutButton.style.display = 'none';

    //TODO: call getAllPersons() here instead of inside form.submit function
    //getAllPersons();
  }
}

async function getAllPersons() {
  //console.log("getAllPersons");
  let response = await gapi.client.sheets.spreadsheets.values.get({spreadsheetId: '1ORV0CFDXnwGDL3d67xBcVmQhOtNheLrRpeAsswXCI2g',range: 'person!A1:C'});
  var range = response.result;
  let users = range.values;
  persons = users;
  //console.log(users);
  return users;
}

async function getAllOrders() {
  await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1ORV0CFDXnwGDL3d67xBcVmQhOtNheLrRpeAsswXCI2g',
    range: 'order!A1:S',
  }).then(function(response) {
    var range = response.result;
    clearOrders();
      var username = getCookie("username");
      if (username) {
        if (range.values.length > 0) {

          for (i = 0; i < range.values.length; i++) {
            if (range.values[i][0] === username || i === 0) {
              var row = range.values[i];
              var data = "";

              for (j = 1; j < row.length; j++) { //skip first column with email(username)
                data = data + '<td>'+row[j]+'</td>'
              }

              $('#table_div > tbody:first').append('<tr>'+ data +'</tr>');
              data = "";
            }
          }
        }
      }
  }, function(response) {
       console.log(response);
  });
}

  var form = $('#auth_form');
  form.submit(function (e) {
    //console.log(e);
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //console.log(username);
    //console.log(password);

    let promise = getAllPersons();
    //TODO: make it without promise and then
    promise.then(function(users) {
      //console.log(users);
      var l = users.length;
      for(i=0; i <= length; ++i) {
        //console.log(users[i][1] + " " + users[i][2]);
        //TODO: make separate messages: 1. for incorrect username 2. for incorrect password
        if (users[i][1] == username && users[i][2] == password) {
          login(username);
          return;
        }
      }

      //TODO: make a modal window
      alert("Не верное 'имя пользователя' или 'пароль'");

    });

  });

  function login(username) {
    setCookie("username", username, 30);
    reloadPage();
  }

  function logout(event) {
    table.style.display = 'none';
    loginForm.style.display = 'block';
    signoutButton.style.display = 'none';
    setCookie("username", username, 0);
    clearOrders();
  }

  function clearOrders() {
    table.innerHTML='<tbody></tbody>';
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    //console.log("getCookie");
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  function checkCookie() {
    //console.log("checkCookie");
    var user = getCookie("username");
    if (user != "") {
        //alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
  }
