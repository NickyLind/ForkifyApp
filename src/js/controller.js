import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    //* 1) Get Search Query 
    const query = searchView.getQuery();
    if(!query) return;


    //* 2) Load Search Results
    await model.loadSearchResults(query);

    //* 3) Render Results
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();