import "./AppointmentList.css";
import Heading from "./Heading";

export default function AppointmentList({
  appoint = [],
  editId,
  editFormData,
  setEditId,
  del,
  startEdit,
  saveEdit,
  cancelEdit,
  handleEditChange,
  clearAll,
}) {
  return (
    <>
      <Heading h1="Appointment List"/>
      {appoint.length === 0 ? (
        <p className="no-Appointment">No appointments added yet.</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appoint.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {editId === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editId === item.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editFormData.date}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    item.date
                  )}
                </td>
                <td className="edit-delete">
                  {editId === item.id ? (
                    <>
                      <button
                        className="action-btn save"
                        onClick={() => saveEdit(item.id)}
                      >
                        Save
                      </button>
                      <button
                        className="action-btn cancel"
                        onClick={() => cancelEdit()}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-btn edit"
                        onClick={() => startEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => del(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {appoint.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          Clear Appointments
        </button>
      )}
    </>
  );
}
