import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const showRecipe = async function() {
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
    console.error(error)
  }
};

// showRecipe();

['hashchange', 'load'].forEach(event => window.addEventListener(event, showRecipe))

// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)