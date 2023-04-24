import { useEffect, useState } from 'react';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';
import Link from 'next/link';

function Alert({ id, title, quantity, productId }) {
  const [product_name, set_product_name] = useState("");
  useEffect(() => {
    async function fetchData() {
      const products = await callBackend('/api/products');
      products.forEach(product => {
        if (product.id == productId) set_product_name(product.name);
      });
    }
    fetchData();
  }, []);
  return (
    <Link href={ `/alerts/${id}` }>
      <div className='item alert'>
        <p>{ title }</p>
        <p>{ quantity } { quantity == 1 ? "item" : "itens" } de "{ product_name }"</p>
      </div>
    </Link>
  );
}

export default function AlertsList() {
  const [alerts, set_alerts] = useState([]);

  useEffect(() => {
    async function loadalerts() {
      const data = await callBackend('/api/alerts');
      set_alerts(data);
    }
    loadalerts();
  }, []);

  return (
    <div className="screen-div">
      <Header title='Alertas' current='Alertas' />
      <Link href='/alerts/new'>Adicionar Novo Alerta</Link>
      <section>
        {
          alerts.map(a => {
            return (
              <Alert
                key={ a.id }
                id={ a.id }
                title={ a.title }
                quantity={ a.quantity }
                productId={ a.productId }
              />
            );
          })
        }
      </section>
    </div>
  );
}
