import Link from "next/link";

export default function Header({ title }) {
  return (
    <header>
      <h1>{ title }</h1>
      <Link href='/'>{'< Voltar para a home'}</Link>
    </header>
  );
}
