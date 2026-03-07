import Navbar from "../components/utils/navbar";

function MatchPage({ matchUser, onKeepSwiping, onSendMessage }) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          {/* Match title */}
          <h1 className="text-3xl font-bold text-pink-500 mb-2">
            🎉 It's a Match!
          </h1>

          <p className="text-gray-500 mb-6">
            You and {matchUser?.name} liked each other
          </p>

          {/* Pictures */}
          <div className="flex justify-center items-center gap-4 mb-6">

            <img
              src={matchUser?.pics?.[0]}
              alt="match"
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow"
            />

          </div>

          {/* Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {matchUser?.name}, {matchUser?.age}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {matchUser?.bio ?? "New connection!"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            <button
              onClick={onSendMessage}
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:scale-105 transition"
            >
              💬 Send Message
            </button>

            <button
              onClick={onKeepSwiping}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
            >
              🔥 Keep Swiping
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MatchPage;