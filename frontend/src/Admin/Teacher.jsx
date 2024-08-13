import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { setAllUsers, updateUser } from '../Redux/actions/userAction';

const Teacher = () => {
  const dispatch = useDispatch();
  const { allUsers, token } = useSelector(state => ({
    allUsers: state.allUsers,
    token: state.token
  }));
  const [loading, setLoading] = React.useState(true);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Full Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'mobile_no', headerName: 'Mobile', type: 'number', width: 130 },
    { field: 'user_type', headerName: 'User Type', width: 100 },
    { field: 'qualification', headerName: 'Qualification', width: 150 },
    { field: 'skills', headerName: 'Skills', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => {
        const user = params.row;
        console.log(user);
        return (
          <div className="flex gap-2">
                {user.is_active ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleBlock(user)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleUnblock(user)}
                  >
                    Unblock
                  </button>
                )}
              </div>
        );
      },
    }
  ];

  // Handle user update
  const handleUpdate = async (user) => {
    // Your logic for updating a user
    dispatch(updateUser(user)); // Example usage, customize as needed
  };

  // Handle block user
  const handleBlock = async (user) => {
    try {
      await axios.post(`http://127.0.0.1:8000/adminn/blockuser/${user.id}/`, {}, {
        headers: { 'Authorization': `Token ${token}` }
      });
      dispatch(setAllUsers(allUsers.map(u => u.id === user.id ? { ...u, is_active: false } : u)));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  // Handle unblock user
  const handleUnblock = async (user) => {
    try {
      await axios.post(`http://127.0.0.1:8000/adminn/unblockuser/${user.id}/`, {}, {
        headers: { 'Authorization': `Token ${token}` }
      });
      dispatch(setAllUsers(allUsers.map(u => u.id === user.id ? { ...u, is_active: true } : u)));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error('No token provided');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await axios.get('http://127.0.0.1:8000/adminn/teachers/', {
          headers: { 'Authorization': `Token ${token}` }
        });
        dispatch(setAllUsers(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch, token]);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allUsers}
          columns={columns}
          loading={loading}
          pagination
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default Teacher;
