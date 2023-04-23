import Link from "next/link";

export default function User({ id, name, sector }) {
  return (
    <Link href={ `/users/${id}` }>
      <div className="item user">
        <p>{ name }</p>
        <p>{ sector }</p>
      </div>
    </Link>
  );
}
