import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [barcode, set_barcode] = useState("");

  async function loadProduct(query_id) {
    const data = await callBackend('/api/products');
    data.forEach(product => {
      if (product.id == query_id) {
        set_name(product.name);
        set_description(product.description);
        set_barcode(product.barcode);
      }
    });
  }

  async function handleAction() {
    if (id != "new") {
      callBackend('/api/products', "PUT", { id, name, description, barcode });
      return;
    }
    callBackend('/api/products', "POST", { name, description, barcode });
  }
  async function handleDelete() {
    callBackend('/api/products', "DELETE", { id });
  }

  useEffect(() => {
    if (id == undefined) return;
    if (id != "new") loadProduct(id);
  }, [id]);

  return (
    <div className="screen-div">
      <Header title='Gerenciar Produtos' />
      <label>Nome:</label>
      <input value={ name } onChange={ (e) => { set_name(e.target.value); } } />
      <label>Descrição:</label>
      <input value={ description } onChange={ (e) => { set_description(e.target.value); } } />
      <label>Código de barras:</label>
      <input value={ barcode } onChange={ (e) => { set_barcode(e.target.value); } } />
      <button type='button' onClick={ handleAction }>{ id == "new" ? "Criar" : "Atualizar" }</button>
      <button type='button' onClick={ handleDelete } disabled={ id == "new" }>Deletar</button>
    </div>
  );
}
