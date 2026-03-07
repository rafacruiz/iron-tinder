
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

function Navbar () {

    const logoutSession = async () => await logout();
    const { logout } = useAuth();

    return (<>
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 text-white font-semibold">
            <Link to='/'>
                <h1 className="text-2xl font-bold">🔥 Irontinder</h1>
            </Link>

            <div className="flex gap-6 text-sm">
            <Link to='/match' className="hover:opacity-80">Matches</Link>
            <Link to='/profile' className="hover:opacity-80">Profile</Link>
            <button className="hover:opacity-80" onClick={ () => logoutSession() }>Logout</button>
            </div>
        </nav>
    </>);
}

export default Navbar;