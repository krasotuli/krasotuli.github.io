  // Client ID and API key from the Developer Console
  var CLIENT_ID = '669257484182-3trne83s0imhd5apjqm8v0njc5svrb0b.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCa42uIFut8a2NDqkXtQ-e3cDgRsIhneDU';


  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');
  var persons;

  //entry point
  function handleClientLoad() {
      gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
        getAllPersons();

    });
  }

  function getAllPersons() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1ORV0CFDXnwGDL3d67xBcVmQhOtNheLrRpeAsswXCI2g',
      range: 'person!A1:C',
    }).then(function(response) {

      var range = response.result;
      persons = range.values;
      //console.log(range.values[0][1]);//e.g. username
      //if (isUserAuthorized()) {
        //var userEmail = getUserEmail();
        //if (userEmail) {

          /*
          if (range.values.length > 0) {
            persons = range.values;
            for (i = 0; i < range.values.length; i++) {
              //if (range.values[i][0] === userEmail || i === 0) {
                var row = range.values[i];
                var data = "";

                for (j = 1; j < row.length; j++) { //skip first column with email
                  data = data + '<td>'+row[j]+'</td>'
                }

                $('#table_div > tbody:first').append('<tr>'+ data +'</tr>');
                data = "";
              //}
            }
          }
          */

        //}
      //}
    }, function(response) {
         console.log(response);
    });
  }

    var form = $('#auth_form');
    form.submit(function (e) {
      e.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      console.log(username);
      console.log(password);
      console.log(persons);

      var l = persons.length;
      for(i=0; i < length; ++i;) {
        if (persons[i][1] == username && persons[i][2] == password) {
          loginSuccess();
        }
      }

    });

    function loginSuccess() {
      //setCookie();
      //getAllOrders();

    }

    function logout() {
      //clearCookies();
      //clearOrders();
    }
