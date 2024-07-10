import { useState } from "react";

import Modal from "./UI/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewChallenge,
  fetchChallengesImages,
  queryClient,
} from "../util/http.js";
import ErrorBlock from "./UI/ErrorBlock.jsx";

export default function NewChallenge() {
  const [selectedImage, setSelectedImage] = useState();
  const {
    data: images,
    isError: isFetchImgError,
    error: imgError,
    isPending: isPendingImgs,
  } = useQuery({
    queryKey: ["challanges-imgs"],
    queryFn: fetchChallengesImages,
  });

  const {
    mutate,
    isPending: isSubmitting,
    isError: isSubmittingError,
    error: submittingError,
  } = useMutation({
    mutationFn: createNewChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries(["challenges"]);
      onClosoHandler();
    },
  });

  const navigate = useNavigate();
  function onClosoHandler() {
    navigate("../");
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    mutate({ challenge: { ...data, image: selectedImage } });
  }

  function selectImageHandler(path) {
    setSelectedImage(path);
  }

  return (
    <Modal title='New Challenge' onClose={onClosoHandler}>
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
        {isFetchImgError && (
          <ErrorBlock
            title='Faield to fetch images'
            message={imgError.info?.message}
          />
        )}
        {isPendingImgs && <p>Loading images...</p>}
        <ul id='new-challenge-images'>
          {images &&
            images.map((image) => (
              <li
                key={image.caption}
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
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Challenge"}
          </button>
        </p>
      </form>
      {isSubmittingError && (
        <ErrorBlock
          title='Faield to create challenge'
          message={
            submittingError.info?.message ||
            "Failed to create challenge. Please check your inputs and try again later."
          }
        ></ErrorBlock>
      )}
    </Modal>
  );
}
