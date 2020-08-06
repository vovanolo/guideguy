import React, { Component } from "react";

import Place from "../components/Place";

export default class Map extends Component {
  render() {
    const places = [1, 2, 3, 4, 5];
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h1>Places</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row row-cols-md-3 row-cols-1">
              {places.map((place, index) => (
                <div key={index} className="col mb-4">
                  <Place id={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
