import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    language: "",
    description: "",
  });
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.age ||
      !formData.description ||
      !formData.gender ||
      !formData.language
    )
      return;

    if (editingUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...formData, id: user.id } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditingUserId(null);
    } else {
      const newUser = { ...formData, id: Date.now() };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
    }

    setFormData({
      name: "",
      age: "",
      gender: "",
      language: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setFormData(userToEdit);
      setEditingUserId(id);
    }
  };

  return (
    <div className="container mx-auto my-5 shadow p-3 mb-5 rounded ">
      <h1 className="my-5 fs-2 text-center">
        Foydalanuvchidan Ma'lumot
        <i class="bi bi-person-circle mx-2"></i>
      </h1>
      <div className="d-flex gap-5">
        <form className="flex-fill w-50">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Name
              <i class="bi bi-person-fill mx-1"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Enter Age
              <i class="bi bi-people-fill mx-2"></i>
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Tanlang:
              <i class="bi bi-gender-ambiguous mx-1"></i>
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Jinsi...</option>
              <option value="Erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
              <option value="Maxfiy">Maxfiy</option>
            </select>
          </div>

          <div className="mb-3">
            <p>Tilni tanlang:</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="language"
                id="uzbek"
                value="Uzbek"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="uzbek">
                Uzbek
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="language"
                id="russian"
                value="Russian"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="russian">
                Russian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="language"
                id="english"
                value="English"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="english">
                English
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Enter Description
              <i class="bi bi-card-text mx-2"></i>
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter Description..."
            ></textarea>
          </div>
          <button
            onClick={handleClick}
            type="submit"
            className="btn btn-primary w-100 "
          >
            {editingUserId !== null ? (
              <i class="bi bi-person-check-fill mx-2"></i>
            ) : (
              <i class="bi bi-person-plus mx-2"></i>
            )}
            {editingUserId !== null ? "Save Changes" : "Save"}
          </button>
        </form>

        <div className="flex-fill w-50 text-center">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Language</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <i class="bi bi-person-fill-check mx-2"></i>
                    {user.name}
                  </td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.language}</td>
                  <td>{user.description}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <i class="bi bi-pencil-square mx-1"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i class="bi bi-person-x-fill mx-1"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
