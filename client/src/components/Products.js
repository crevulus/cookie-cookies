import React from 'react';

function Products(props) {

  return (
    <div>
      <ul>
        {props.products.map((product, i) => (
          <li key={i}>
            <h3>{product.topping}</h3>
            <p>{product.price}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

