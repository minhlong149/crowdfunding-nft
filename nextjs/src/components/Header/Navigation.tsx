import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contributed">Contribution</Link>
        </li>
        <li>
          <Link href="/announced">Your project</Link>
        </li>
      </ul>
    </nav>
  );
}
