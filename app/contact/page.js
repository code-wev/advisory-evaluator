"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    emailjs
      .send(
        "service_yg6crvq",
        "template_8diwivp",
        {
          from_name: form.fullname.value,
          from_email: form.email.value,
          phone: form.phone.value,
          subject: form.subject.value,
          message: form.message.value,
        },
        "iNWaNvT1JVzQhab3R"
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          form.reset();
        },
        (error) => {
          console.log("FAILED...", error);
          setLoading(false);
        }
      );
  };

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      {/* LEFT IMAGE */}
      <div className="w-full h-full">
        <img
          src="/contact.jpg"
          alt="Consultation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="bg-[#0A4A7A] text-white w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <h1 className="text-5xl font-semibold leading-tight mb-6">
          We&apos;re Here <br /> to Help
        </h1>

        <p className="text-sm text-gray-200 mb-10 max-w-md">
          Please use the form below to send us a message. We will make every
          effort to respond to your inquiry within one business day.
        </p>

        <form onSubmit={sendEmail} className="w-full max-w-md space-y-5">

          {/* FULL NAME */}
          <div>
            <label className="text-xs block mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter Your Name"
              required
              className="w-full bg-[#0D4372] border-b border-[#FFFFFF2E] px-4 py-2 text-sm placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              required
              className="w-full bg-[#0D4372] border-b border-[#FFFFFF2E] px-4 py-2 text-sm placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-xs block mb-1">Phone Number</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="phone"
                placeholder="Enter Your Phone Number"
                className="flex-1 bg-[#0D4372] border-b border-[#FFFFFF2E] px-4 py-2 text-sm placeholder-gray-300 focus:outline-none"
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <label className="text-xs block mb-1">Subject</label>
            <select
              name="subject"
              className="w-full bg-[#0D4372] border-b border-[#FFFFFF2E] px-4 py-2 text-sm text-white placeholder-gray-300 focus:outline-none"
            >
              <option className="text-black">General Inquiry</option>
              <option className="text-black">Support</option>
              <option className="text-black">Partnership</option>
            </select>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-xs block mb-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Write Your Message"
              rows={4}
              required
              className="w-full bg-[#0D4372] border-b border-[#FFFFFF2E] px-4 py-2 text-sm placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-4 bg-white text-[#0A4A7A] px-10 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {success && (
            <p className="text-green-300 text-sm mt-2">✔ Message sent successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
}
