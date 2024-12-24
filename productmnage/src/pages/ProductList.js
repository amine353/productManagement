import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erreur lors de la récupération des produits:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nos Produits</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`/placeholder.svg?height=200&width=200&text=${product.name}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price.toFixed(2)} €</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">Voir détails</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

