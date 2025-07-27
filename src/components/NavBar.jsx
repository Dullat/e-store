import { Link, NavLink } from "react-router-dom"
import { FaGlobe, FaUser } from "react-icons/fa"

const NavBar = () => {
    return (
        <div className='text-white flex justify-between items-center p-4 *:flex *:items-center'>
            <div className="text-2xl">Dullat Store</div>
            <nav className="gap-4">
                <NavLink to="/" className={({isActive}) => isActive? "text-blue-600" : "text-white"}>
                    Home
                </NavLink>
                <NavLink to="/discover" className={({isActive}) => isActive? "text-blue-600" : "text-white"}>
                    Browse
                </NavLink>
                <NavLink to="/news" className={({isActive}) => isActive? "text-blue-600" : "text-white"}>
                    News
                </NavLink>
            </nav>
            <div className="gap-6">
                <Link to="/">
                    <FaGlobe size={24} color="#555" title="language" />
                </Link>
                <Link to="/">
                    <FaUser size={24} color="#555" title="User" />
                </Link>
            </div>
        </div>
    )
}

export default NavBar