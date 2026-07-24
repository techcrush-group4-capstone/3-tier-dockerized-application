import { useState } from "react";
import "../styles/contact.css";
import "../styles/contact.css";

function Contact() {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className="contact-page">

      <div className="contact-info">

        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you. Whether you have questions,
          feedback, or suggestions about FormFlow, feel free to reach out.
        </p>

        <div className="contact-details">

          <h3>📍 Address</h3>
          <p>Abuja, FCT, Nigeria</p>

          <h3>📧 Email</h3>
          <p>support@formflow.com</p>

          <h3>📞 Phone</h3>
          <p>+234 XXX XXX XXXX</p>

          <h3>⏰ Working Hours</h3>
          <p>Monday - Friday</p>
          <p>8:00 AM - 5:00 PM</p>

        </div>

      </div>

      <div className="contact-form">

        <div className="row">

          <div className="field">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>

          <div className="field">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>

        </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="example@email.com"
        />

        <label>Subject</label>
        <input
          type="text"
          placeholder="Enter Subject"
        />

        <label>Message</label>
        <textarea
          placeholder="Write your message..."
        ></textarea>

        <button>Send Message</button>

      </div>

    </div>
  );
}

export default Contact;