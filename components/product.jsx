import Link from "next/link";

export default function Product({ id, name, description }) {
  return (
    <Link href={ `/products/${id}` }>
      <div className="item product">
        <p>{ name }</p>
        <p>{ description }</p>
      </div>
    </Link>
  );
}
