import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    emailjs.send(
      "service_j2jsp3b",
      "template_hhqcphs",
      {
        name: form.name,
        email: form.email,
        message: form.message
      },
      "E5CvVdmdr7t8CiTR7"
    ).then(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      // Reset back to normal form after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    }).catch(() => {
      // If it fails, revert to idle so they can try again
      setStatus("idle");
    });
  };

  return (
    <section className="contact container" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow reveal">05 / Contact</p>
      
      <div className="contact-grid reveal">
        <div>
          <h2 id="contact-title">Let’s make something<br /><a href="mailto:jajooshobhit@gmail.com">useful.</a></h2>
          <div className="contact__links" style={{ marginTop: '32px' }}>
            <p><strong>Phone:</strong> +91 8955726633</p>
            <p><strong>Email:</strong> jajooshobhit@gmail.com</p>
            <div style={{ display: 'flex', gap: '22px', marginTop: '16px' }}>
              <a href="https://github.com/shobhit-jajoo" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/shobhit-jajoo/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://leetcode.com/u/shobhitjajoo/" target="_blank" rel="noreferrer">LeetCode ↗</a>
            </div>
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="success-alert">
              <p style={{ fontFamily: 'var(--mono)', fontSize: '14px', margin: 0, color: 'var(--ink)' }}>
                Message sent.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '8px' }}>
                Thanks for reaching out. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                disabled={status === "loading"}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                disabled={status === "loading"}
              />
              <textarea
                placeholder="Your message..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4}
                required
                disabled={status === "loading"}
              />
              <button 
                className="button" 
                type="submit" 
                style={{ width: "100%", opacity: status === "loading" ? 0.7 : 1 }}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    Sending
                    <span className="loading-dots">
                      <span></span>
                      <span></span>
                    </span>
                  </>
                ) : (
                  "Send Message ↗"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}