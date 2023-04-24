import { useEffect, useState } from 'react';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';
import Link from 'next/link';

function Task({ task }) {
  const [user_name, set_user_name] = useState("");

  useEffect(() => {
    async function fetchData() {
      const users = await callBackend('/api/users');
      users.forEach(u => {
        if (u.id == task.userId) set_user_name(u.name);
      });
    }
    fetchData();
  }, []);

  return (
    <Link href={ `/tasks/${task.id}` }>
      <div className='item task'>
        <p>{ task.title }</p>
        <p>{ task.description }</p>
        <p>{ user_name }</p>
        <p>{ new Date(task.date).toISOString().slice(0, 10) } { '->' } { new Date(task.due_date).toISOString().slice(0, 10) }</p>
        { task.complete_date == null ? '' : <p>Completa em: { new Date(task.complete_date).toISOString().slice(0, 10) }</p> }
      </div>
    </Link>
  );
}

export default function TasksList() {
  const [tasks, set_tasks] = useState([]);

  useEffect(() => {
    async function loadtasks() {
      const data = await callBackend('/api/tasks');
      set_tasks(data);
    }
    loadtasks();
  }, []);

  return (
    <div className="screen-div">
      <Header title='Tarefas' current='Tarefas' />
      <Link href='/tasks/new'>Adicionar Nova Tarefa</Link>
      <section className='two-column'>
        <section>
          <h2>A fazer:</h2>
          {
            tasks.map(t => {
              if (t.complete_date == null) return <Task key={ t.id } task={ t } />;
            })
          }
        </section>
        <section>
          <h2>Concluídas:</h2>
          {
            tasks.map(t => {
              if (t.complete_date != null) return <Task key={ t.id } task={ t } />;
            })
          }
        </section>
      </section>
    </div>
  );
}
