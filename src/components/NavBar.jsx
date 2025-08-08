import { Link, NavLink } from "react-router-dom"
import { FaGlobe, FaBars, FaUser, FaTimes } from "react-icons/fa"
import { useContext, useRef, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useLocation, matchPath } from "react-router-dom"

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { userProfile } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const asideRef = useRef(null)
    const burgerRef = useRef(null)

    const isOnPath = matchPath('/login', location.pathname)

    useEffect(() => {
        if (!isOpen) return;

        function handleOutsideClick(e) {
            if (!asideRef.current || !burgerRef.current) return;
            if (burgerRef.current.contains(e.target)) return
            if (

                e.target.contains(asideRef.current) // true : asideRef.current.contains(asideRef.current) -> true
            ) {
                console.log('hahah')
                return;
            } else {

                console.log('setting false');

                setIsOpen(false);
            }
        }
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isOpen]);

    return (
        <div className='text-white flex justify-between items-center p-4 bg-[#0e0e10]'>
            <div className="text-2xl">Dullat Store</div>
            <div className="hidden md:block">
                <Nav />
            </div>
            <div className="hidden md:block">
                <Avatar userProfile={userProfile} user={user} isOnPath={isOnPath} />
            </div>
            <button
                ref={burgerRef}
                className="md:hidden text-gray-100 cursor-pointer"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
            >
                <FaBars size={28} />
            </button>
            {
                isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <aside ref={asideRef} className="md:hidden fixed top-0 right-0 w-72 max-w-full h-full z-40 bg-[#1f1f29] shadow-xl border-l border-zinc-800 flex flex-col p-6 animate-slide-in">
                            <button
                                className="self-end text-gray-300 mb-6 cursor-pointer"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <FaTimes size={28} />
                            </button>

                            <Nav className="flex-col items-start" />
                            <Avatar userProfile={userProfile} user={user} isOnPath={isOnPath} fromSideBar={true} />
                        </aside>
                    </>
                )
            }
        </div>
    )
}

const Nav = ({ className }) => {
    return (
        <nav className={`gap-4 items-center flex ${className}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "text-white"}>
                Home
            </NavLink>
            <NavLink to="/discover" className={({ isActive }) => isActive ? "text-blue-600" : "text-white"}>
                Browse
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => isActive ? "text-blue-600" : "text-white"}>
                News
            </NavLink>
        </nav>
    )
}

const Avatar = ({ userProfile, user, isOnPath, fromSideBar = false }) => {
    const { signOut } = useContext(AuthContext)

    return (
        <div className="gap-6 flex items-center w-full mt-auto">
            {
                isOnPath ? <p className="py-1 px-2 bg-blue-600 rounded cursor-progress">You can do it...</p> :
                    (
                        <Link to={user ? "/user" : "/login"} className="w-full block">
                            {
                                userProfile?.avatar ? (
                                    fromSideBar ? (
                                        <>
                                            <div className="flex mt-auto items-center gap-2 relative">
                                                <img src={userProfile.avatar} alt="user"
                                                    className="h-8 w-8 object-cover rounded-full"
                                                />
                                                <p className="bg-gray-700 rounded py-1 px-2">{userProfile.user_name}</p>
                                            </div>
                                            <button onClick={signOut} className="cursor-pointer py-2 w-full bg-red-600 text-white my-3 rounded text-sm">log-out</button>
                                        </>
                                    ) : (
                                        <img src={userProfile.avatar} alt="user"
                                            className="h-8 w-8 object-cover rounded-full"
                                        />
                                    )
                                ) :
                                    (
                                        user ? (
                                            <p className="py-1 px-2 bg-blue-600 rounded">Set Profile</p>
                                        ) : (
                                            <div className="flex items-center gap-2" title="why waste ur life , login now">
                                                <FaUser size={24} color="#555" title="User" />
                                                <p className="py-1 px-2 bg-blue-600 rounded">Log-In</p>
                                            </div>
                                        )
                                    )
                            }
                        </Link>
                    )
            }
        </div>
    )
}

export default NavBar