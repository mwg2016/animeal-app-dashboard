import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const profileEndpoint = import.meta.env.VITE_ADMIN_PROFILE_ENDPOINT;
  const changePasswordEndpoint = import.meta.env.VITE_ADMIN_CHANGE_PASSWORD_ENDPOINT;
  const username = 'admin';

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  useEffect(() => {
    axios.get(profileEndpoint)
      .then((res) => {
        setAdmin(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load admin profile");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const submitPasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordForm;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.patch(changePasswordEndpoint, {
        username,
        oldPassword,
        newPassword
      });
      toast.success("Password updated successfully");
      setIsModalOpen(false);
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20 px-4 lg:px-12 ml-64">
        <div className="w-full h-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-[#B72765] mb-6 text-center">Admin Profile</h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : admin ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="mt-3 text-lg font-medium text-gray-800">{admin.username}</p>
                <p className="text-sm text-gray-600">Role: {admin.role || "Admin"}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 bg-[#B72765] hover:bg-[#a31e57] text-white px-4 py-2 rounded-lg transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Failed to load profile.</p>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>

            <div className="space-y-4">
              {/* Old Password */}
              <div className="relative">
                <input
                  type={passwordVisibility.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                {passwordForm.oldPassword && (
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
                  >
                    {passwordVisibility.oldPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                {passwordForm.newPassword && (
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
                  >
                    {passwordVisibility.newPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                {passwordForm.confirmPassword && (
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
                  >
                    {passwordVisibility.confirmPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              <div className="text-right">
                <button
                  onClick={submitPasswordChange}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Profile;
