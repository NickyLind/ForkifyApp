import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime';


// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

if(module.hot) {
  module.hot.accept();
}

const controlRecipe = async function() {
  try {
    let id = window.location.hash.slice(1);

    if(!id) return
    recipeView.renderSpinner();
    
    //* 1) Loading Recipe
    await model.loadRecipe(id)
    // const { recipe } = model.state

    //* 2) Rendering Recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    //* 1) Get Search Query 
    const query = searchView.getQuery();
    if(!query) return;


    //* 2) Load Search Results
    await model.loadSearchResults(query);

    //* 3) Render Results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());
  } catch (error) {
    console.log(error);
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();