import Link from "next/link";

export default function MainMenuWidget() {
    return (<>
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/ximilar">Ximilar</Link></li>
            </ul>
        </nav>
    </>)
}