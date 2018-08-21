//Code modified from https://github.com/FlaneurApp/flaneur-social-location/blob/master/services/facebook.js

/**
 * Retrieves an App Token for the Facebook API
 * It can be used for Facebook App configuration or especially retrieving a test user token
*/

const fbHost = 'https://graph.facebook.com/'
const fbAPIVersion = 'v3.1'
const getAppTokenURL = '/oauth/access_token'
// const getTestUserURL = '/accounts/test-users'

const clientID=326938021180775;
const clientSecret="a55eff19ad762bcdb45f64f2e50ee879";

function getAppToken(appID=clientID, appSecret=clientSecret) {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;

const headers = {
  'Accept': 'application/json'
}

  fetch(url, {headers})
  .then(res => res.json())
    .then(data => {
      console.log(data);
      return data.access_token
    })
    // .then((response) => {
    //  console.log(response.json());
    //  // const parsedResponse = JSON.parse(response)
  //  //    return parsedResponse.access_token
  //      });

  }

export const getData = (accessToken, place) => {

const url = encodeURI(`${fbHost}/${fbAPIVersion}/search?type=place&q=${place.shortName}&center=${place.coordinates.lat},${place.coordinates.long}&distance=500&fields=name,overall_star_rating,rating_count,engagement,cover,link,description&access_token=${accessToken}`);
console.log('url => ',url);
  return fetch(url)
        .then((response) => response.json())
        .then((result) => {
          const data = result.data[0];
          console.log('data => ',data);
            // handle Errors and empty data
            if (data) {
                return {
                code: place.code,
                hasData: true,
        name: data.name,
        description: data.description,
        overall_star_rating: data.overall_star_rating,
        rating_count: data.rating_count,
        engagement: data.engagement,
        cover: data.cover,
        link: data.link
                }
            //If no data, return object indicating that data is not available
            } else {
              return {
                code: place.code,
                hasData: false
              }
            }
        })
        }

export default getAppToken;