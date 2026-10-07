import React from 'react';

type Props = {
  num1: number;
  num2: number;
};

const ComponenteTS = (props: Props) => {
  return (
    <div>
      La suma de {props.num1} y {props.num2} es: {props.num1 + props.num2}
    </div>
  );
};

export default ComponenteTS;