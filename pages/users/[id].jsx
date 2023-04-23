import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import callBackend from "../../utils/callbackend";
import Header from "../../components/header";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [name, set_name] = useState("");
  const [sector, set_sector] = useState("");
  async function loadUser(query_id) {
    const data = await callBackend('/api/users');
    data.forEach(user => {
      if (user.id == query_id) {
        set_name(user.name);
        set_sector(user.sector);
      }
    });
  }
  async function handleAction() {
    if (id != "new") {
      callBackend('/api/users', "PUT", { id, name, sector });
      return;
    }
    callBackend('/api/users', "POST", { name, sector });
  }
  async function handleDelete() {
    callBackend('/api/users', "DELETE", { id });
  }

  useEffect(() => {
    if (id == undefined) return;
    if (id != "new") loadUser(id);
  }, [id]);

  return (
    <div className="screen-div">
      <Header title='Gerenciar Pessoas' />
      <label>Nome:</label>
      <input value={ name } onChange={ (e) => { set_name(e.target.value); } } />
      <label>Setor:</label>
      <input value={ sector } onChange={ (e) => { set_sector(e.target.value); } } />
      <button type='button' onClick={ handleAction }>{ id == "new" ? "Adicionar" : "Atualizar" }</button>
      <button type='button' onClick={ handleDelete } disabled={ id == "new" }>Deletar</button>
    </div>
  );
}
