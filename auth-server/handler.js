'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
//enforces strict mode, which catches common coding mistakes
'use strict';

//import Google APIS client library
const { google } = require("googleapis");
//Initialize the Google Calendar API client for version 3.
const calendar = google.calendar("v3");
//define the scopes, which determine the level of access to the user's data
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
/* Destructure environment variables for client secret, client ID, and calendar ID.
If you see process.env, this means the value being referred to is in the config.json file. 
 */
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
//Define an array of redirect URIs. The OAuth2 client will redirect users here after they authorize access.
const redirect_uris =  [
  "https://theawin.github.io/meet/"
];

//Create a new OAuth2 client using the client ID, client secret, and the first redirect URI.
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  //as the the first uri in from the redirect_uris array is passed, [0] is used
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option. 
   * Generates an authorization URL.
   * The `scope` option specifies the level of access that the application is requesting.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    // Specifies that the app needs to access Google APIs when the user is not present.
    access_type: "offline",
    // Pass the defined scopes to the `scope` option.
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  }; 
};

module.exports.getAccessToken = async(event) => {
  //Decode authorization code extracted from the URL query parameters
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  //Return a new Promise to handle asynchronous token exchange
  return new Promise((resolve,reject) => {
     /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */
    oAuth2Client.getToken(code, (error,response) => {
      if(error) {
        return reject(error);
      }
      // If successful, resolve the promise with the response containing the access token
      return resolve(response);
    });
  })
    .then((results) => {
      //Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async(event) => {
  
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({access_token});

  return new Promise((resolve,reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};