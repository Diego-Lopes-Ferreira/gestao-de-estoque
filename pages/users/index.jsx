import { useEffect, useState } from 'react';
import callBackend from '../../utils/callbackend';
import Header from '../../components/header';
import User from '../../components/user';

export default function UsersList() {
  const [users, set_users] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await callBackend('/api/users');
      set_users(data);
    }
    loadUsers();
  }, []);

  return (
    <div className="screen-div">
      <Header title='Pessoas' />
      <section>
        {
          users.map(u => {
            return <User key={ u.id } id={ u.id } name={ u.name } sector={ u.sector } />;
          })
        }
      </section>
    </div>
  );
}
