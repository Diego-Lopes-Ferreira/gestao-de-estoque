import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import callBackend from "../../utils/callbackend";
import Header from "../../components/header";

export default function EditAlert() {
  const router = useRouter();
  const { id } = router.query;

  const [title, set_title] = useState("");
  const [quantity, set_quantity] = useState(0);
  const [productId, set_productId] = useState("");

  const [products, set_products] = useState([]);

  async function loadData() {
    // load transactions, products and users
    if (id != "new") {
      const alerts = await callBackend('/api/alerts');
      alerts.forEach(alert => {
        if (alert.id == id) {
          set_title(alert.title);
          set_quantity(alert.quantity);
          set_productId(alert.productId);
        }
      });
    }
    const responseProducts = await callBackend('/api/products');
    set_products(responseProducts);
  }

  async function handleAction() {
    let quantity_formated = Number(quantity);
    if (id != "new") {
      callBackend('/api/alerts', "PUT", {
        id, title, quantity: quantity_formated, productId
      });
      return;
    }
    callBackend('/api/alerts', "POST", {
      title, quantity: quantity_formated, productId
    });
  }
  async function handleDelete() {
    callBackend('/api/alerts', "DELETE", { id });
  }

  useEffect(() => {
    if (id == undefined) return;
    loadData();
  }, [id]);

  return (
    <div className="screen-div">
      <Header title='Gerenciar Alerta' current='Editar' links={ [{ text: 'Alertas', url: '/alerts' }] } />
      <label>Título:</label>
      <input value={ title } onChange={ (e) => { set_title(e.target.value); } } />
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
      <button type='button' onClick={ handleAction }>{ id == "new" ? "Adicionar" : "Atualizar" }</button>
      <button type='button' onClick={ handleDelete } disabled={ id == "new" }>Deletar</button>
    </div>
  );
}
