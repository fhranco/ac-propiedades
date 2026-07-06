import React from "react";

const ChatBoxForm = () => {
  return (
    <form className="d-flex align-items-center">
      <input
        className="form-control"
        type="search"
        placeholder="Escribe un mensaje..."
        aria-label="Search"
        required
      />
      <button type="submit" className="btn ud-btn btn-thm">
        Enviar mensaje
        <i className="fal fa-arrow-right-long" />
      </button>
    </form>
  );
};

export default ChatBoxForm;
