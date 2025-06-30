import { useState } from "react";
import { nanoid } from "nanoid";
import "./InputFields.css";
import AppointmentList from "./AppointmentList";

export default function InputFields() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const [appointments, setAppointments] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", date: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFormData(event) {
    event.preventDefault();

    const newAppointment = {
      id: nanoid(),
      name: formData.name,
      date: formData.date,
    };

    setAppointments((prev) => [...prev, newAppointment]);
    setFormData({ name: "", date: "" });
  }

  function deleteItem(id) {
    const updatedAppointments = appointments.filter((item) => item.id !== id);
    setAppointments(updatedAppointments);
  }

  function startEdit(id) {
    const itemToEdit = appointments.find((item) => item.id === id);
    setEditId(id);
    setEditFormData({ name: itemToEdit.name, date: itemToEdit.date });
  }

  function saveEdit(id) {
    const updatedAppointments = appointments.map((item) =>
      item.id === id
        ? { ...item, name: editFormData.name, date: editFormData.date }
        : item
    );
    setAppointments(updatedAppointments);
    setEditId(null);
  }

  function cancelEdit() {
    setEditId(null);
  }
  function clearAll() {
    setAppointments([]);
  }
  return (
    <>
      <form onSubmit={handleFormData}>
        <div className="form-row">
          <div className="label-column">
            <label htmlFor="name">Full Name:</label>
            <label htmlFor="date">Appointment Date:</label>
          </div>

          <div className="input-column">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Add Appointment</button>
      </form>

      <AppointmentList
        appoint={appointments}
        editId={editId}
        editFormData={editFormData}
        setEditId={setEditId}
        del={deleteItem}
        startEdit={startEdit}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        handleEditChange={handleEditChange}
        clearAll={clearAll}
      />
    </>
  );
}
