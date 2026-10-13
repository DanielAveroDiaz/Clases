import React from 'react';
import PropTypes from 'prop-types';

const Practica4 = (props) => {
  return (
    <>
      <h2>Operación Suma</h2>
      <p>
        La suma de {props.num1} y {props.num2} es: {props.num1 + props.num2}
      </p>
    </>
  );
};

Practica4.propTypes = {
  num1: PropTypes.number.isRequired,
  num2: PropTypes.number.isRequired,
};

export default Practica4;