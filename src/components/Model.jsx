import React from "react";
// import Button from "./Button";

const Modal = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "80%",
          display:'grid',
          gridTemplateColumns: '1fr'
        }}
      >
        {children}
        
      </div>
    </div>
  );
};

export default Modal;
