import { useSelector } from "react-redux";

const Profile = () => {

   const { authUser } = useSelector(state => state.auth);
  return (
    <div className="mx-auto p-6 w-fit flex justify-center">

      <div className="bg-white shadow-lg rounded-xl p-10 max-w-3xl w-full">

        {/* TOP SECTION */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Profile Image */}
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

          {/* Name + Role */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{authUser?.name}</h2>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="mt-10 grid sm:grid-cols-2 gap-8">

          {/* Email */}
          <div>
            <p className="text-gray-500 font-medium">Email Address</p>
            <p className="text-gray-800">{authUser?.email}</p>
          </div>

        </div>

        {/* BIO */}
        <div className="mt-10">
          <p className="text-gray-500 font-medium">Bio</p>
          <p className="text-gray-700 leading-relaxed mt-1">
            {authUser?.bio || "No bio available"}
          </p>
        </div>

        <div className="mt-2">
          <p>
            {authUser.createdAt && (
              <span className="text-gray-500 font-medium">
                Member since: {new Date(authUser.createdAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;