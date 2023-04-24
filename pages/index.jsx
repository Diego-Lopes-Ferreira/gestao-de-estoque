import Link from "next/link";
import { useEffect, useState } from "react";
import callBackend from "../utils/callbackend";

export default function HomePage() {
  const [products, set_products] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const transactions = await callBackend('/api/transactions');
      let productsResponse = await callBackend('/api/products');
      productsResponse.forEach(product => {
        product.quantity = 0;
      });
      transactions.forEach(transaction => {
        productsResponse.forEach(product => {
          if (product.id == transaction.productId) product.quantity += transaction.quantity;
        });
      });
      set_products(productsResponse);
    }
    fetchData();
  }, []);

  return (
    <main>
      <h1>Relatório de Produtos</h1>
      <Link href="/users" >Gerenciar Pessoas</Link>
      <Link href="/products" >Gerenciar Produtos</Link>
      <Link href="/transactions" >Gerenciar Transacoes</Link>
      <Link href="/alerts" >Gerenciar Alertas</Link>
      <Link href="/tasks" >Gerenciar Tarefas</Link>
      {/* TODO: Tarefa 4.05 */ }
      <section>
        {
          products.map(product => {
            return <Link href={`/products/${product.id}`}>
              <div className="item">
                <p>{product.name}: {product.quantity}</p>
              </div>
            </Link>
          })
        }
      </section>
    </main>
  );
}
