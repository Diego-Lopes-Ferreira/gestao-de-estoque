import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import callBackend from "../../utils/callbackend";
import Header from "../../components/header";

export default function EditTransaction() {
  const router = useRouter();
  const { id } = router.query;

  const [date, set_date] = useState(new Date().toISOString().slice(0, 10));
  const [quantity, set_quantity] = useState(0);
  const [productId, set_productId] = useState("");
  const [userId, set_userId] = useState("");
  const [users, set_users] = useState([]);
  const [products, set_products] = useState([]);

  async function loadData() {
    // load transactions, products and users
    if (id != "new") {
      const transactions = await callBackend('/api/transactions');
      transactions.forEach(transaction => {
        if (transaction.id == id) {
          set_date(new Date(transaction.date).toISOString().slice(0, 10));
          set_quantity(transaction.quantity);
          set_productId(transaction.productId);
          set_userId(transaction.userId);
        }
      });
    }
    const responseUsers = await callBackend('/api/users');
    set_users(responseUsers);
    const responseProducts = await callBackend('/api/products');
    set_products(responseProducts);
  }

  async function handleAction() {
    let date_formated = new Date(date);
    let quantity_formated = Number(quantity);
    if (id != "new") {
      callBackend('/api/transactions', "PUT", {
        id, date: date_formated, quantity: quantity_formated, productId, userId
      });
      return;
    }
    callBackend('/api/transactions', "POST", {
      date: date_formated, quantity: quantity_formated, productId, userId
    });
  }
  async function handleDelete() {
    callBackend('/api/transactions', "DELETE", { id });
  }

  useEffect(() => {
    if (id == undefined) return;
    loadData();
  }, [id]);

  return (
    <div className="screen-div">
      <Header title='Gerenciar Transações' />
      <label>Data:</label>
      <input value={ date } type="date" onChange={ (e) => { set_date(e.target.value); } } />
      <label>Quantidade:</label>
      <input value={ quantity } type="number" onChange={ (e) => { set_quantity(e.target.value); } } />
      <label>Produto:</label>
      <select value={ productId } onChange={ (e) => { set_productId(e.target.value); } }>
        <option value='' disabled>Selecione um produto</option>
        {
          products.map(p => {
            return <option value={ p.id } key={ p.id }>{ p.name }</option>;
          })
        }
      </select>
      <label>Responsável:</label>
      <select value={ userId } onChange={ (e) => { set_userId(e.target.value); } }>
        <option value='' disabled>Selecione um responsável</option>
        {
          users.map(u => {
            return <option value={ u.id } key={ u.id }>{ u.name } ({ u.sector })</option>;
          })
        }
      </select>
      <button type='button' onClick={ handleAction }>{ id == "new" ? "Adicionar" : "Atualizar" }</button>
      <button type='button' onClick={ handleDelete } disabled={ id == "new" }>Deletar</button>
    </div>
  );
}
