import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      data: [],
      query: "",
    };
    this.queryText = React.createRef();
  }

  searchText() {
    setTimeout((evnt) => {
      let query = this.queryText.current.value;
      query = query.trimLeft();
      query = query.trimRight();
      this.setState({ query });
    }, 1500);
    if (this.state.query != "") {
      console.log(this.state.query);
      fetch(`http://localhost:8080/api/search?keyword=${this.state.query}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ data });
          console.log(data);
        });
      let query = "";
      this.setState({ query });
    } else if(this.state.query == "") {
      let data = [];
      this.setState({ data });
    }
  }

  /*componentDidMount(){ // göstermelik sonradan silinecek
    fetch("http://localhost:8080/api/search?keyword=mother")
    .then((res) => res.json())
    .then((data) => {
      this.setState({ data });
      console.log(data);
    });
  } */

  render() {
    return (
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12 mb-5 search">
            <div className="mb-3 col-4 mx-auto text-center searchInputs">
              <label className="form-label h1">Search</label>
              <input
                type="text"
                className="from-control"
                onChange={this.searchText.bind(this)}
                ref={this.queryText}
              />
              <div className="searchIcon">
                <SearchIcon />
              </div>
            </div>
          </div>

          {this.state.data.map((item, index) => {
            return (
              <div className="col-6 col-md-6 col-lg-4 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <img src={item.Poster} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.Title}</h5>
                    <p className="card-text">{item.Year}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
