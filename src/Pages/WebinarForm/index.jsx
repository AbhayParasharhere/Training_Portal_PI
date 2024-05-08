import React, { useContext, useState } from "react";
import { addWebinar } from "../../Firebase/webinar";
import { RealTimeDataContext } from "../../context/primaryDataContext";

function WebinarForm() {
  const webinars = useContext(RealTimeDataContext).webinars;
  console.log("Webinars in WebinarForm", webinars);
  // Initialize form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "",
    hostPosition: "",
    link: "",
    time: "",
    agenda: [""],
  });

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle changes for agenda array
  const handleAgendaChange = (index, event) => {
    const updatedAgenda = [...formData.agenda];
    updatedAgenda[index] = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      agenda: updatedAgenda,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWebinar(formData);
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Host:
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Host Position:
          <input
            type="text"
            name="hostPosition"
            value={formData.hostPosition}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Link:
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Time:
          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>Agenda:</label>
        {formData.agenda.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleAgendaChange(index, e)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              agenda: [...prevFormData.agenda, ""],
            }))
          }
        >
          Add Agenda Item
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WebinarForm;
