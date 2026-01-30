import React, { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { collection, Firestore, getDocs, type DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProductDetailModal } from './ProductDetailModal';

async function getProducts(db: Firestore): Promise<DocumentData[]> {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return productList;
}

export const MenuGallery: React.FC = () => {
  const [products, setProducts] = React.useState<DocumentData[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Modificamos el click en la tarjeta
  const handleProductClick = (id: string) => {
    // Buscamos el producto completo en tu array 'products'
    const product = products.find(p => p.id === id); 
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = (product: any) => {
    console.log("Agregado al carrito:", product.title);
    // Aquí tu lógica de carrito o navegación al checkout
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(db);
        setProducts(products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  },[]);

    
  

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10"> {/* Agregué padding externo y fondo gris claro */}
      
      {/* EL GRID RESPONSIVO DE TAILWIND */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            url={product.url}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
        <ProductDetailModal 
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
       />
      </div>
    </div>
  );
};