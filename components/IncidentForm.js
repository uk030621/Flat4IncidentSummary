"use client";
import { useState } from "react";

// Generate random 7-character alphanumeric incident code
function generateIncidentCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function IncidentForm({ onSubmit, initialData }) {
  const emptyForm = {
    name: "",
    email: "",
    flatNumber: "",
    date: "",
    time: "",
    description: "",
    impact: "",
    reportedTo: "",
    referenceNo: "",
    incidentCode: generateIncidentCode(),
  };

  const [form, setForm] = useState(initialData || emptyForm);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "flatNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm({ ...form, [name]: digitsOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleKeyDown = (e) => {
    const invalidKeys = ["e", "E", "+", "-", ".", ","];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      incidentCode: form.incidentCode || generateIncidentCode(),
    };

    const success = await onSubmit(data);
    if (success) {
      setForm({
        ...emptyForm,
        incidentCode: generateIncidentCode(),
      });

      setSuccessMessage(
        `✅ Incident ${data.incidentCode} submitted successfully. Letting Agent Has been notified for remedial action.`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "flatNumber", label: "Your Flat Number", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "time", label: "Time", type: "time" },
    { name: "description", label: "Description of Incident", type: "text" },
    { name: "impact", label: "Impact on You / Household", type: "text" },
    { name: "reportedTo", label: "Police involvement?", type: "text" },
    { name: "referenceNo", label: "Police Reference No.", type: "text" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full"
    >
      <h1 className="text-2xl mb-4 text-center">
        <span className="text-red-700 dark:text-red-400 font-bold">Flat 4</span>
      </h1>
      <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Incident Report Form
      </h2>

      {successMessage && (
        <div className="p-3 text-green-800 dark:text-green-100 bg-green-100 dark:bg-green-700 border border-green-300 dark:border-green-600 rounded">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label className="block font-medium text-sm mb-1 text-gray-900 dark:text-gray-100">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onKeyDown={name === "flatNumber" ? handleKeyDown : undefined}
              inputMode={name === "flatNumber" ? "numeric" : undefined}
              pattern={name === "flatNumber" ? "[0-9]*" : undefined}
              required={[
                "name",
                "email",
                "flatNumber",
                "date",
                "time",
                "description",
              ].includes(name)}
              className="w-full border px-3 py-2 rounded 
                         focus:outline-none focus:ring focus:ring-blue-300
                         bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100
                         border-gray-300 dark:border-gray-600"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        Submit
      </button>
    </form>
  );
}
