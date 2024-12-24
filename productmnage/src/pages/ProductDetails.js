import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Erreur lors de la récupération du produit:', error));
  }, [id]);

  if (!product) {
    return <div className="container mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`/placeholder.svg?height=400&width=400&text=${product.name}`} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="lead">{product.price.toFixed(2)} €</p>
          <p>{product.description}</p>
          <button className="btn btn-primary">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

