
import { useAuth } from '../contexts/auth-context';

import Suggestions from '../components/suggestions/suggestions-tinder';

function HomePage() {
  
  const { logout } = useAuth();

  const logoutSession = async () => await logout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 text-white font-semibold">
        <h1 className="text-2xl font-bold">🔥 Irontinder</h1>

        <div className="flex gap-6 text-sm">
          <button className="hover:opacity-80">Matches</button>
          <button className="hover:opacity-80">Profile</button>
          <button className="hover:opacity-80" onClick={ () => logoutSession() }>Logout</button>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-6">
        <Suggestions />
      </div>
    </div>
  );
}

export default HomePage;