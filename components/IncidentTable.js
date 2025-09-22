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
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          Total Incidents:{" "}
          <span className="font-semibold">{incidents.length}</span>
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Incidents reported by Flat:
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
          {Object.entries(flatCounts).map(([flat, count]) => (
            <li key={flat}>
              Flat {flat}: <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded shadow text-sm bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Name
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Email
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Flat No.
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Date
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Time
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Description
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Impact
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Police Involvement
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Police Case No.
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Incident Code
              </th>
              <th className="p-2 border dark:border-gray-600 dark:text-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr
                key={i._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.name}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.email}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.flatNumber}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {formatDate(i.date)}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.time}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.description}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.impact}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.reportedTo}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.referenceNo}
                </td>
                <td className="p-2 border dark:border-gray-600 dark:text-gray-200">
                  {i.incidentCode}
                </td>
                <td className="p-2 border dark:border-gray-600">
                  <button
                    onClick={() => handleDelete(i._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
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
