import { useState } from "react";

import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";

export default function NewChallenge() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Modal title='New Challenge' onClose={() => navigate("../")}>
      <form id='new-challenge' onSubmit={handleSubmit}>
        <p>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' />
        </p>

        <p>
          <label htmlFor='description'>Description</label>
          <textarea name='description' id='description' />
        </p>

        <p>
          <label htmlFor='deadline'>Deadline</label>
          <input type='date' name='deadline' id='deadline' />
        </p>

        <ul id='new-challenge-images'></ul>

        <p className='new-challenge-actions'>
          <button type='button'>Cancel</button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
