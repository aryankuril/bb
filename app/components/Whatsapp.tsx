"use client";
import React from "react";

const Whatsapp = () => {
  const whatsappNumber = "911234567890"; // 👈 Replace with your WhatsApp number including country code
  const message = "Hello! I want to chat with you."; // Optional pre-filled message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <img
        src="/images/whatsapp.png" // 👈 put your WhatsApp icon in public/images/
        alt="WhatsApp"
        style={{
          width: "80%",
          height: "80%",
          objectFit: "contain",
        }}
      />
    </a>
  );
};

export default Whatsapp;
