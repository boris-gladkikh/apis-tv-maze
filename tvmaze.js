/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  let searchUrl = "http://api.tvmaze.com/search/shows?";
  let $searchValue = $("#search-query").val();



  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let response = await axios.get(searchUrl,{params:{
    q: $searchValue
  }});
  let searchResult = response.data;
  console.log("search result", searchResult);
  let resultArray = [];

  for (let i = 0; i < searchResult.length; i++) {
    let showObj = {};
    showObj.id = searchResult[i].show.id;
    showObj.name = searchResult[i].show.name;
    showObj.summary = searchResult[i].show.summary;
    if (searchResult[i].show.image === null) {
      showObj.image = 
      "https://www.nicepng.com/png/detail/767-7677499_mandy-pinned-naomi-again-hannibal-buress-thats-wack.png";
    } else {
      showObj.image = searchResult[i].show.image.medium;
    };
    
    resultArray.push(showObj);

  }
  console.log("this is our lovely array", resultArray)

  return resultArray;
   
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image}">
           <button class="episodes" data-show-id="${show.id}">Episodes</button>
           <p class="card-text">${show.summary}</p>
         </div>
       </div>
     </div>
    `);
    $('.episodes').on("click", getEpisodes(show.id));
  $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */


async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above

  let searchURL = `http://api.tvmaze.com/shows/${id}/episodes`
  let response = await axios.get(searchURL);
  console.log("our episodes response is", response);
}

function populateEpisodes(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image}">
           <button class="episodes" data-show-id="${show.id}">Episodes</button>
           <p class="card-text">${show.summary}</p>
         </div>
       </div>
     </div>
    `);
  $showsList.append($item);
  $('.episodes').on("click", getEpisodes);
  }
}