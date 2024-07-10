import { useState } from "react";

import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchChallengesImages } from "../util/http.js";

export default function NewChallenge() {
  const [selectedImage, setSelectedImage] = useState();
  const {
    data: images,
    isError: isFetchImgError,
    error: imgError,
  } = useQuery({
    queryKey: ["challanges-imgs"],
    queryFn: fetchChallengesImages,
    
  });
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }
  function selectImageHandler(path) {
    setSelectedImage(path);
  }
  
  
  return (
    <Modal title='New Challenge' onClose={() => navigate("../")}>
      <form id='new-challenge' onSubmit={handleSubmit}>
        <p>
          <label htmlFor='title'>Title</label>
          <input required type='text' name='title' id='title' />
        </p>

        <p>
          <label htmlFor='description'>Description</label>
          <textarea required name='description' id='description' />
        </p>

        <p>
          <label htmlFor='deadline'>Deadline</label>
          <input required type='date' name='deadline' id='deadline' />
        </p>
        <ul id='new-challenge-images'>
          {isFetchImgError && ()}
          {images &&
            images.map((image) => (
              <li
                key={image.alt}
                onClick={() => selectImageHandler(image.path)}
                className={
                  selectedImage === image.path ? "selected" : undefined
                }
              >
                <img
                  src={`http://localhost:3000/${image.path}`}
                  alt={image.caption}
                />
              </li>
            ))}
        </ul>

        <p className='new-challenge-actions'>
          <button type='button'>Cancel</button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
