import React from 'react';

function Products(props) {
  const { addToCart } = props;

  return (
    <div>
      <ul>
        {props.products.map((product, index) => (
          <li key={index}>
            <h3>{product.topping}</h3>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add To Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

