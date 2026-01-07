
import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.error("Profile load failed:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      const res = await api.put(
        "/users/me",
        { name: form.name, email: form.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile((prev) => ({
        ...prev,
        name: form.name,
        email: form.email,
      }));

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.name = form.name;
        parsed.email = form.email;
        localStorage.setItem("user", JSON.stringify(parsed));
      }
    } catch (err) {
      console.error("Update failed:", err);
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>User Profile 💖</h2>

        {message && <p className="profile-message">{message}</p>}

        {!isEditing ? (
          <>
            <p>
              <b>Name:</b> {profile.name}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            <p>
              <b>Member Since:</b>{" "}
              {profile.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : ""}
            </p>

            <button
              className="profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <div className="profile-actions">
              <button type="submit" className="profile-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="profile-btn secondary"
                onClick={() => {
                  setIsEditing(false);
                  setForm({ name: profile.name, email: profile.email });
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;