"use client";
import IncidentForm from "../../components/IncidentForm";

export default function SubmissionPage() {
  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        return true; // ✅ lets IncidentForm reset fields
      } else {
        console.error("Submission failed");
        return false;
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      return false;
    }
  };

  return <IncidentForm onSubmit={handleSubmit} />;
}
