export default function Header() {
    return (
        <header className="bg-gray-300 rounded">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex items-center gap-x-12">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="text-gray-700 text-3xl">
                            Broccoli & Co
                        </span>
                    </a>
                </div>
            </nav>
        </header>
    );
}
