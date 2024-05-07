import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    headers: { Authorization: 'Bearer ' + localStorage.access_token },
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="w-full mt-10">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-xl font-bold">List Users</h2>
                <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>No</th>
                            <th><b>Username</b></th>
                            <th><b>Age</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th>{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
