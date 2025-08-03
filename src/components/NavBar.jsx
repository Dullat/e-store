import { Link, NavLink } from "react-router-dom"
import { FaGlobe, FaUser } from "react-icons/fa"
import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useLocation, matchPath } from "react-router-dom"

const NavBar = () => {
    const { userProfile } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const location = useLocation()

    const isOnPath = matchPath('/login', location.pathname)
    return (
        <div className='text-white flex justify-between items-center p-4 *:flex *:items-center bg-[#0e0e10]'>
            <div className="text-2xl">Dullat Store</div>
            <nav className="gap-4">
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
            <div className="gap-6">
                {
                    isOnPath ? <p className="py-1 px-2 bg-blue-600 rounded cursor-progress">You can do it...</p> :
                        (
                            <Link to={user ? "/user" : "/login"}>
                                {
                                    userProfile?.avatar ? (
                                        <img src={userProfile.avatar} alt="user"
                                            className="h-8 w-8 object-cover rounded-full"
                                        />
                                    ) :
                                        (
                                            <div className="flex items-center gap-2" title="why waste ur life , login now">
                                                <FaUser size={24} color="#555" title="User" />
                                                <p className="py-1 px-2 bg-blue-600 rounded">Log-In</p>
                                            </div>
                                        )
                                }
                            </Link>
                        )
                }
            </div>
        </div>
    )
}

export default NavBar