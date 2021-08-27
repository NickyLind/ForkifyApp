import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime';


// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function() {
  try {
    let id = window.location.hash.slice(1);

    if(!id) return
    recipeView.renderSpinner();

    //* 1) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //* 2) Update bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
    //* 3) Loading Recipe
    await model.loadRecipe(id)
    // const { recipe } = model.state
    
    //* 4) Rendering Recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    recipeView.renderError();
    console.error(error);
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
    resultsView.render(model.getSearchResultsPage());

    //* 4) Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function(goToPage) {
    //* 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //* 2) Render NEW pagination buttons
    paginationView.render(model.state.search)
};

const controlServings = function(newServings) {
  //* Update the recipe servings (in state)
  model.updateServings(newServings)
  //* Update the view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
};

const controlAddBookmark = function() {
  //* 1) Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //* 2) Update recipe view
  recipeView.update(model.state.recipe);

  //* 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();