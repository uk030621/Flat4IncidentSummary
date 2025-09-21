"use client";
import { useState, useEffect } from "react";

export default function IncidentTable() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then(setIncidents);
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/incidents/${id}`, { method: "DELETE" });
    setIncidents(incidents.filter((i) => i._id !== id));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // 🔹 Count incidents by flat number
  const flatCounts = incidents.reduce((acc, i) => {
    acc[i.flatNumber] = (acc[i.flatNumber] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2 text-sm text-gray-700">
          Total Incidents:{" "}
          <span className="font-semibold">{incidents.length}</span>
        </p>

        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Incidents reported by Flat:
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {Object.entries(flatCounts).map(([flat, count]) => (
            <li key={flat}>
              Flat {flat}: <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Flat No.</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Impact</th>
              <th className="p-2 border">Police Involvement</th>
              <th className="p-2 border">Police Case No.</th>
              <th className="p-2 border">Incident Code</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i._id} className="hover:bg-gray-100">
                <td className="p-2 border">{i.name}</td>
                <td className="p-2 border">{i.email}</td>
                <td className="p-2 border">{i.flatNumber}</td>
                <td className="p-2 border">{formatDate(i.date)}</td>
                <td className="p-2 border">{i.time}</td>
                <td className="p-2 border">{i.description}</td>
                <td className="p-2 border">{i.impact}</td>
                <td className="p-2 border">{i.reportedTo}</td>
                <td className="p-2 border">{i.referenceNo}</td>
                <td className="p-2 border">{i.incidentCode}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
