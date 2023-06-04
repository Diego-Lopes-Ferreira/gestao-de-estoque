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
      <nav>
        <h1>Menu</h1>
        <h2>Gerenciamento de Cadastro</h2>
        <Link href="/users">Usuários</Link>
        <Link href="/products">Produtos</Link>
        <Link href="/alerts">Alertas*</Link>
        <h2>Ações</h2>
        <Link href="/transactions" >Transações</Link>
        <Link href="/tasks" >Tarefas</Link>
      </nav>
      <section>
        <h1>Relatório de Produtos</h1>
        <p className="explanation">
          Aqui são mostrados quais os produtos que estão cadastrados no estoque
          e qual a quantidade de cada um. Clique em um produto para editar seu
          registro.
        </p>
        {
          products.map(product => {
            return <Link key={ product.id } href={ `/products/${product.id}` }>
              <div className="item">
                <p>{ product.name }: <strong>{ product.quantity }</strong></p>
              </div>
            </Link>;
          })
        }
      </section>
    </main>
  );
}
