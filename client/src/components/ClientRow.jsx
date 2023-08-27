import { FaPen, FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT, UPDATE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useState } from "react";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    //refetchQueries: [{ query: GET_CLIENTS, variables: { id: client.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      return alert("Please fill out all fields");
    }

    updateClient(name, email, phone);
    alert("Updated successfully!");

    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="d-flex gap-2">
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
        <button
          className="btn btn-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#editClientModal"
        >
          <FaPen />
        </button>

        <div
          className="modal fade"
          id="editClientModal"
          aria-labelledby="editClientModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">
                  Edit Client
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
