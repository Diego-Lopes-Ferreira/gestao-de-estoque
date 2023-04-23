import { useEffect, useState } from 'react';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';
import Product from '../../components/product';

export default function ProductsList() {
  const [products, set_products] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await callBackend('/api/products');
      set_products(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="screen-div">
      <Header title='Produtos' />
      <section>
        {
          products.map(p => {
            return <Product key={ p.id } id={ p.id } name={ p.name } description={ p.description } />;
          })
        }
      </section>
    </div>
  );
}
