import Express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// *to fix fetch error not define
import fetch from "node-fetch";

// *omdbapi key
const apikey = "b29e742f";

var app = Express();

// *for get request and to solve cors problems
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// *prepare PORT
const PORT = process.env.PORT || 8080;

// *this function sends a request to the api according to the entered keyword and
// *returns the response it receives from the api as an array of 20 results.
async function resultOfSearch(keyword) {
  let page = 1;
  const max_result_to_show = 2;
  let result = [];
  try {
    // *every page send 10 result array type of json
    while (page <= max_result_to_show) {
      // *assigning the result to array
      let Temp = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&s=${keyword}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          const resultArr = data.Search;
          let temp = [];
          for (let i = 0; i < resultArr.length; i++) {
            let obj = {
              Title: resultArr[i].Title,
              Year: resultArr[i].Year,
              imdbID: resultArr[i].imdbID,
              Type: resultArr[i].Type,
              Poster: resultArr[i].Poster,
            };
            temp.push(obj);
          }
          return temp;
        });
      // *Merge the incoming results into a single array
      for (let j = 0; j < page * Temp.length; j++) {
        if (result.indexOf(j) === -1) {
          if (Temp[j] != undefined) result.push(Temp[j]);
        }
      }
      page++;
    }
    // *Return single result array
    return result;
  } catch (error) {
    console.log(error);
  }
}

// *show author information 
app.get("/", (req, res) => {
  const author = {
    author: "samed kilic",
    the_current_situation: "Kocaeli University final year computer engineering student"
  };

  res.json(author);
});

//* API for submitting queries
app.get("/api/search", async (req, res) => {
  const keyword = req.query.keyword;
  const result = await resultOfSearch(keyword);
  if (result) {
    console.log(result);
    res.json(result);
  }
});

// *Running server
app.listen(PORT, () => {
  console.log(
    `Server run at ${PORT} port \nIf you want go to : http://localhost:${PORT}/`
  );
});
