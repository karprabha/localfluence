import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-slate-800">
            <div className="max-w-7xl m-auto py-2 flex justify-between items-center px-4">
                <h1 className="text-2xl text-white font-semibold">
                    <Link href={"/"}>Localfluence</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/login"
                                className="text-white hover:text-yellow-400"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/signup"
                                className="text-white hover:text-yellow-400"
                            >
                                Signup
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
