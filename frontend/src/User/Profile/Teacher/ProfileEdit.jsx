import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProfileEdit = ({ user, token, onClose, onUpdate }) => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
        
        await axios.patch('http://localhost:8000/api/user/', data, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        onUpdate(); // Refresh user data after update
        onClose(); // Close the modal
      } catch (error) {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
      }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              defaultValue={user.username}
              {...register('username', { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              defaultValue={user.email}
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              defaultValue={user.mobile_no}
              {...register('mobile_no')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              defaultValue={user.qualification}
              {...register('qualification')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              defaultValue={user.skills}
              {...register('skills')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
