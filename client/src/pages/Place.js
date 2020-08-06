import React from 'react';

export default class Place extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Hotel "Lviv"',
      image: 'https://q-cf.bstatic.com/images/hotel/max1024x768/142/142620748.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

  }

  render() {
    return (
      <section class="place">
        <div class="container place__container">
          <div class="row mt-5">

            <div class="col-12 text-center mt-5">
              <h1 class="place__header">{this.state.name}</h1>
            </div>

            <div class="col-12 d-flex justify-content-center align-items-center mt-2">
              <div class="place__picture">
                <img src={this.state.image}></img>
              </div>
            </div>

            <div class="col-12 text-center mt-3">
              <p class="place__description">{this.state.description}</p>
            </div>

          </div>
        </div>

      </section>
    )
  }
}