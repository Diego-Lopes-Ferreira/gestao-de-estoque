import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import callBackend from "../../utils/callbackend";
import Header from "../../components/header";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  const [date, set_date] = useState(new Date().toISOString().slice(0, 10));
  const [due_date, set_due_date] = useState(new Date().toISOString().slice(0, 10));
  const [complete_date, set_complete_date] = useState("");
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [userId, set_userId] = useState("");

  const [users, set_users] = useState([]);

  async function loadData() {
    const responseUsers = await callBackend('/api/users');
    set_users(responseUsers);

    if (id == "new") return;

    const tasks = await callBackend('/api/tasks');
    tasks.forEach(task => {
      if (task.id != id) return;
      set_date(new Date(task.date).toISOString().slice(0, 10));
      set_due_date(new Date(task.due_date).toISOString().slice(0, 10));
      if (task.complete_date != null) set_complete_date(new Date(task.complete_date).toISOString().slice(0, 10));
      set_title(task.title);
      set_description(task.description);
      set_userId(task.userId);
    });
  }

  async function handleAction() {
    let data = {
      // id
      date: new Date(date),
      due_date: new Date(due_date),
      // complete_date
      title,
      description,
      userId,
    };
    if (id != "new") {
      data.id = id;
      if (complete_date != "") {
        data.complete_date = new Date(complete_date);
      }
      callBackend('/api/tasks', "PUT", data);
      return;
    }
    callBackend('/api/tasks', "POST", data);
  }
  async function handleDelete() {
    callBackend('/api/tasks', "DELETE", { id });
  }

  useEffect(() => {
    if (id == undefined) return;
    loadData();
  }, [id]);

  return (
    <div className="screen-div">
      <Header title='Gerenciar Tarefa' current='Editar' links={ [{ text: 'Tarefas', url: '/tasks' }] } />
      {/* DATAS */ }
      <label>Data de início:</label>
      <input value={ date } type="date" onChange={ (e) => { set_date(e.target.value); } } />
      <label>Data de conclusão:</label>
      <input value={ due_date } type="date" onChange={ (e) => { set_due_date(e.target.value); } } />
      <label>Data de Conclusão:</label>
      <input value={ complete_date } type="date" onChange={ (e) => { set_complete_date(e.target.value); } } />

      {/* TEXTOS */ }
      <label>Título:</label>
      <input value={ title } onChange={ (e) => { set_title(e.target.value); } } />
      <label>Descrição:</label>
      <textarea value={ description } onChange={ (e) => { set_description(e.target.value); } }></textarea>

      {/* SELECTS */ }
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
