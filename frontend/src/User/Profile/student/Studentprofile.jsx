import { useForm } from 'react-hook-form';
import { logout } from '../../../Redux/actions/userAction'; // Adjust the path according to your project structure
import Side from './Side';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileUpdateModal from './ProfileUpdateModal';

const StudentProfile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setValue } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
        // Set form values
        setValue('username', response.data.username || '');
        setValue('email', response.data.email || '');
        setValue('phone', response.data.phone || '');
        setValue('qualification', response.data.qualification || '');
        setValue('mobile_no', response.data.mobile_no || '');
        setValue('skills', response.data.skills || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token, setValue]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const refreshUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Side onLogout={handleLogout} />
      <main className="flex-1 p-6">
        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-br from-purple-700 to-purple-900 text-white flex items-center justify-center rounded-tl-lg rounded-bl-lg p-8">
              <img
                src={user.profile_picture || '/default-profile.png'}
                alt={`${user.username}'s profile`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h6 className="text-xl font-semibold text-center mb-4">Student Information</h6>
              <hr className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-sm font-medium">Full Name</h6>
                  <p className="text-gray-600 font-semibold">{user.username || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="text-sm font-medium">Email</h6>
                  <p className="text-gray-600 font-semibold">{user.email || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="text-sm font-medium">User</h6>
                  <p className="text-gray-600 font-semibold">{user.user_type || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="text-sm font-medium">Qualification</h6>
                  <p className="text-gray-600 font-semibold">{user.qualification || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="text-sm font-medium">Skills</h6>
                  <p className="text-gray-600 font-semibold">{user.skills || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="text-sm font-medium">Phone</h6>
                  <p className="text-gray-600 font-semibold">{user.mobile_no || 'N/A'}</p>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="col-span-2 mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <ProfileUpdateModal
            user={user}
            token={token}
            onClose={() => setIsModalOpen(false)}
            onUpdate={refreshUserProfile}
            navigate={navigate} // Pass navigate function to modal
          />
        )}
      </main>
    </div>
  );
};

export default StudentProfile;
