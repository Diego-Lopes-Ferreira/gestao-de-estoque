import { useEffect, useState } from 'react';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';
import Transaction from '../../components/transaction';
import Link from 'next/link';

export default function TransactionsList() {
  const [transactions, set_transactions] = useState([]);

  useEffect(() => {
    async function loadTransactions() {
      const data = await callBackend('/api/transactions');
      set_transactions(data);
    }
    loadTransactions();
  }, []);

  return (
    <div className="screen-div">
      <Header title='Transações' current='Transações' />
      <Link href='/transactions/new'>Adicionar Nova Transação</Link>
      <section>
        {
          transactions.map(t => {
            return <Transaction
              key={ t.id }
              id={ t.id }
              date={ t.date }
              quantity={ t.quantity }
              productId={ t.productId }
              userId={ t.userId }
            />;
          })
        }
      </section>
    </div>
  );
}
