import { useEffect, useState } from "react";
import callBackend from '../utils/callbackend';
import Link from "next/link";

export default function Transaction({ id, date, quantity, productId, userId }) {
  const [user_name, set_user_name] = useState("");
  const [product_name, set_product_name] = useState("");


  useEffect(() => {
    async function fetchData() {
      const users = await callBackend('/api/users');
      users.forEach(u => {
        if (u.id == userId) set_user_name(u.name);
      });
      const products = await callBackend('/api/products');
      products.forEach(p => {
        if (p.id == productId) set_product_name(p.name);
      });

    }
    fetchData();
  }, []);

  return (
    <Link href={ `/transactions/${id}` }>
      <div className="item transaction">
        <p>{ product_name }</p>
        <p>{ quantity }</p>
        <p>{ user_name } ({ new Date(date).toISOString().slice(0, 10) })</p>
      </div>
    </Link>
  );
}
