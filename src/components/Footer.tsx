export default function Footer() {
    return (
        <footer aria-labelledby="footer-heading" className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
                <div className="border-t border-white/10 pt-8">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Broccoli & Co. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
