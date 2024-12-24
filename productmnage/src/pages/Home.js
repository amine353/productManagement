import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Bienvenue sur VêtementsEnLigne</h1>
        <p className="lead">Découvrez notre collection de vêtements à la mode pour hommes et femmes.</p>
        <hr className="my-4" />
        <p>Explorez nos dernières tendances et trouvez votre style unique.</p>
        <Link className="btn btn-primary btn-lg" to="/products" role="button">Voir les produits</Link>
      </div>
    </div>
  );
}

export default Home;

