
import Suggestions from '../components/suggestions/suggestions-tinder';
import Navbar from '../components/utils/navbar';

function HomePage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex flex-col">
      <Navbar />
      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-6">
        <Suggestions />
      </div>
    </div>
  );
}

export default HomePage;