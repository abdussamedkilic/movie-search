# movie-search
it's an basic movie search engine with omdbapi 

### To Run this project
  - First you need to go backend folder and download node modules with "npm i" command
  - when node modules downloaded u can run it with "npm start"
  - Second you need to go fronend folder and download node modules with "npm i" command
  - when node modules downloaded and backend running u can run it with "npm start"
  
  
 ### Project Content
  - The backend code is an api written in nodejs express js. In this api, we get the word to be searched with the keyword parameter to /api/search, 
  and we communicate with omdbapi and get 20 results and return them in json type
  - In the front end code, we send the word we are looking for in the search bar as a keyword parameter to the api we wrote in the backend code, 
  and the picture, name and year of the results are displayed as 3 columns on large screens and 2 columns on small screens.

### How to get 20 result from omdbapi
  - omdbapi send only 10 result with one request and always give you page 1 results to fix that
    - I use "&page={pagenumber}" add this parameter to backend code and increase pagenumber with 2 request i get 20 different result
  - I use bootstrap to make frontend as like picture, name and year of the results are displayed as 3 columns on large screens and 2 columns on small screens
