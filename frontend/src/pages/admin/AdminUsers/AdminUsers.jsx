import { useEffect, useState } from "react";

import AdminNavbar from "../AdminNavbar/AdminNavbar";

import {
    getUsers,
    deleteUser
} from "../../../services/adminApi";

import "./AdminUsers.css";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this user?"
        );
        if (!confirmDelete) return;
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="users-container">
                <h1>Manage Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminUsers;