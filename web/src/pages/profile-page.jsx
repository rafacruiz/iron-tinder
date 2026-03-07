import Navbar from "../components/utils/navbar";

function ProfilePage({ user }) {

  const defaultAvatar = "https://randomuser.me/api/portraits/lego/1.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex flex-col">
      
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">

          {/* Avatar */}
          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
              <img
                src={user?.pics?.[0] ?? defaultAvatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user?.name}, {user?.age}
            </h2>

            <p className="text-gray-500">
              {user?.gender ?? "Not specified"}
            </p>

          </div>

          {/* Bio */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {user?.bio ?? "No bio available"}
            </p>
          </div>

          {/* Info section */}
          <div className="mt-6 space-y-3">

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-gray-800 text-sm font-medium">
                {user?.email}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 text-sm">Location</span>
              <span className="text-gray-800 text-sm font-medium">
                {user?.location ?? "Unknown"}
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">

            <button
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition shadow-lg"
            >
              Edit Profile
            </button>

            <button
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;