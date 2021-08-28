# ForkifyJS

## **_Description_**

This application showcases OOP using vanilla JS with asynchronous AJAX calls and a 3rd party API

## **_Features_**

- Search 1,000,000 recipes using ingredients or title and use pagination to display the results
- Render results from 3rd party API in pagination and on main view
- Highlight preview in the pagination for selected recipe
- Display render icon when waiting for async calls to finish
- Built-in error handling using try-catch
- Dynamically increase the ingredients needed when adjusting servings
- Ability to bookmark recpies using local storage
- Clicking bookmarked recipes will highlight the recipe in the bookmarks dropdown as well as display the recipe in the main view
- Users can add recipes that will be stored in local storage as well as the API and added to their bookmarks
- Recipes that user's have added are exclusive to their API key and display an icon the shows that it belongs to them

## **_Known Issues/Potential Updates_**

_Due to the nature of the application really only being created to showcase OOP in vanilla JS some features are purposefully omitted._

- When errors or success messages are rendered when clicking 'add recipe' the messages won't reset unless the page is reloaded
- Streamlining the add recipe process so that the form doesn't require a specific format to be submitted
- Adding authentication and authorization could be a future goal

## **_Setup_**

This project requries the user to have an IDE ( I use [Visual Studio Code](https://code.visualstudio.com/)) and [Node Packet Manager](https://nodejs.org/)
simply copy this repo into the desired directory on your local system and open it with your favorite editor. You must run the command `npm install` into the root directory of your project and then you will be able to run `npm start` to access the application on http://localhost:1234/
