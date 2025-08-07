import { FaGithub, FaLink } from "react-icons/fa";

const Footer = () => (
    <footer className="bg-[#18181c] text-zinc-300 border-t border-zinc-600/30 px-6 py-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
                <h2 className="text-lg font-bold text-white mb-1 tracking-wide select-none">e-Store Project</h2>
                <p className="text-sm text-zinc-400 max-w-md">
                    An RAWG/Epic-Games/Steam/GOG inspired storefront built with React, Supabase, and RAWG.io.<br />
                </p>
                <div className="text mt-4">
                    <p className="font-bold">Features</p>
                    <ul className="list-disc pl-4 text-gray-400 text-sm">
                        <li><p>User authentication : Sign-Up/Sign-In</p></li>
                        <li><p>Profile and Avatar Updating</p></li>
                        <li><p>Personal Cart</p></li>
                    </ul>
                    <p className="text-sm text-gray-400 mt-4">
                        and blazing-fast game search--all powered by modern open APIs.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:items-end gap-2 text-sm mt-auto">
                <div className="flex items-center gap-3">
                    <a href="https://appwrite.io/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition">Appwrite</a>
                    <span className="text-zinc-500">|</span>
                    <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition">Supabase</a>
                    <span className="text-zinc-500">|</span>
                    <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition">RAWG.io API</a>
                </div>
                <div className="flex items-center gap-3 mt-1">
                    <a href="https://github.com/dullat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                        <FaGithub size={16} />
                        <span>View on GitHub</span>
                    </a>
                </div>
                <span className="text-xs text-zinc-500 mt-2 block">© {new Date().getFullYear()} e-Store. Not affiliated with Epic, Steam, or RAWG.</span>
            </div>
        </div>
    </footer>
);

export default Footer;
