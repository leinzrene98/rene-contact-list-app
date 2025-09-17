

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchAllContacts, deleteContact, updateContact } from "../lib/fetch";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [editingId, setEditingId] = useState(null); // currently editing contact
  const [editData, setEditData] = useState({ name: "", phone: "", email: "", address: "" });

  useEffect(() => {
    fetchAllContacts(dispatch);
  }, []);

  const startEditing = (contact) => {
    setEditingId(contact.id);
    setEditData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ name: "", phone: "", email: "", address: "" });
  };

  const saveEditing = async () => {
    try {
      await updateContact(editingId, editData, dispatch);
      setEditingId(null);
      setEditData({ name: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error("Failed to update contact:", err);
    }
  };

  return (
    <div className="container py-5">
      {!store || !store.contacts ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="list-group">
          {store.contacts.map((contact) => (
            <li
              key={String(contact.id)}
              className="list-group-item d-flex justify-content-between align-items-center py-2"
            >
              {/* LEFT: Image + Info or Edit Form */}
              <div className="d-flex align-items-center">
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt={contact.name}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                {editingId === contact.id ? (
                  <div>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      placeholder="Name"
                      className="form-control mb-1"
                    />
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      placeholder="Phone"
                      className="form-control mb-1"
                    />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      placeholder="Email"
                      className="form-control mb-1"
                    />
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      placeholder="Address"
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <strong>{contact.name}</strong>
                    <br />
                    <small>{contact.phone} · {contact.email}</small>
                    <br />
                    <small className="text-muted">{contact.address}</small>
                  </div>
                )}
              </div>

              {/* RIGHT: Action buttons */}
              <div className="d-flex gap-2">
                {editingId === contact.id ? (
                  <>
                    <button className="btn btn-success btn-sm" onClick={saveEditing}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={() => startEditing(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteContact(contact.id, dispatch)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">Go Back Home</Link>
      </div>
    </div>
  );
};