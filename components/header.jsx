import Link from "next/link";

export default function Header({ title, current, links }) {
  if (links == undefined) links = [];
  console.log(links);
  return (
    <header>
      <h1>{ title }</h1>
      <p>
        <Link href='/'>{ 'Home' }</Link>
        { links.map(link => <>{ ' > ' }<Link href={ link.url }>{ link.text }</Link></>) }
        { ' > ' }{ current }
      </p>
    </header>
  );
}
