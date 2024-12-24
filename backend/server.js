import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/productsmanagement", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Schéma pour les produits
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Route pour obtenir tous les produits
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
});

// Route pour obtenir un produit spécifique
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
});

// Route pour créer une commande
app.post('/api/orders', (req, res) => {
  const { items, total } = req.body;
  
  // Ici, vous traiteriez normalement la commande et l'enregistreriez dans une base de données
  console.log('Commande reçue:', { items, total });
  
  // Simulons un traitement de commande
  setTimeout(() => {
    res.status(201).json({ 
      message: 'Commande créée avec succès', 
      orderId: Date.now(),
      items,
      total
    });
  }, 1000); // Délai simulé de 1 seconde
});

// Route pour initialiser la base de données avec quelques produits
app.post('/api/init-db', async (req, res) => {
  try {
    await Product.deleteMany({}); // Supprime tous les produits existants
    const productsToInsert = [
      { name: 'T-shirt', price: 19.99, description: 'Un t-shirt confortable en coton' },
      { name: 'Jeans', price: 49.99, description: 'Un jean durable et à la mode' },
      { name: 'Veste', price: 79.99, description: 'Une veste élégante pour toutes les occasions' },
      { name: 'Robe', price: 59.99, description: 'Une robe légère et stylée' },
      { name: 'Chaussures', price: 89.99, description: 'Des chaussures confortables pour la marche' },
    ];
    await Product.insertMany(productsToInsert);
    res.status(201).json({ message: 'Base de données initialisée avec succès' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'initialisation de la base de données", error });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});