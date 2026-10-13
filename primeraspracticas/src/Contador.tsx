import React, { Component } from 'react';

class Contador extends Component {
  state = { count: 0 }; // Inicializamos el state a 0

  render() {
    const { count } = this.state; // Extraemos el count del state
    return (
      <div>
        <p>Has hecho click {count} veces</p>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Haz click!
        </button>
      </div>
    );
  }
}

export default Contador;