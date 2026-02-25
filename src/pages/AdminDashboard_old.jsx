
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";



export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   fetch(`${API_URL}/api/admin/users`)
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setUsers(users.map(u =>
      u.id === id ? { ...u, status } : u
    ));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Role</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Mobile</th>
            <th>GST</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.role}</td>
              <td>{u.company_name}</td>
              <td>{u.contact_person}</td>
              <td>{u.mobile}</td>
              <td>{u.gst_number || "-"}</td>
              <td>{u.status}</td>
              <td>
                {u.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(u.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(u.id, "rejected")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
