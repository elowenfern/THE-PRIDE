import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers, updateUser } from '../Redux/actions/userAction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
export default function Dashboard() {
  const dispatch = useDispatch();
  const { allUsers, token } = useSelector(state => ({
    allUsers: state.allUsers,
    token: state.token
  }));
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminn/students/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      dispatch(setAllUsers(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch, token]);

  // Handle user update
  const handleUpdate = async (user) => {
    // Your logic for updating a user
    dispatch(updateUser(user)); // Example usage, customize as needed
  };

  // Handle block user
  const handleBlock = async (user) => {
    try {
      await axios.post(`http://127.0.0.1:8000/adminn/block-user/${user.id}/`, {}, {
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Update"
          className="p-button-info"
          onClick={() => handleUpdate(rowData)}
        />
        <Button
          label="Block"
          className="p-button-danger"
          onClick={() => handleBlock(rowData)}
        />
        <Button
          label="Unblock"
          className="p-button-success"
          onClick={() => handleUnblock(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex align-items-center justify-content-between gap-2">
      <span className="text-xl font-bold">Users</span>
      <Button icon="pi pi-refresh" rounded raised onClick={fetchUsers} />
    </div>
  );

  const footer = `In total there are ${allUsers ? allUsers.length : 0} users.`;

  return (
    <div className="card">
      <DataTable
        value={allUsers}
        header={header}
        footer={footer}
        loading={loading}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column field="id" header="ID" />
        <Column field="username" header="Full Name" />
        <Column field="email" header="Email" />
        <Column field="mobile_no" header="Mobile" />
        <Column field="user_type" header="User Type" />
        <Column field="qualification" header="Qualification" />
        <Column field="skills" header="Skills" />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}