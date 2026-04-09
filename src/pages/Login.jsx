import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { setUser, setRole } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = () => {
  if (!form.name || !form.email) return;

  localStorage.setItem("viewerUser", JSON.stringify(form));
  setUser(form);
  setRole("viewer");

  navigate("/dashboard");
};

  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-80 space-y-4 border border-white/10">
        <h2 className="text-xl font-semibold text-center">
          Viewer Login
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>

    </div>
  );
}