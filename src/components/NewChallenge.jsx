import { useRef, useState } from "react";

import Modal from "./UI/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewChallenge,
  fetchChallengesImages,
  queryClient,
} from "../util/http.js";
import ErrorBlock from "./UI/ErrorBlock.jsx";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";

export default function NewChallenge() {
  const [selectedImage, setSelectedImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();

  const [scope, animate] = useAnimate();

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
      onCloseHandler();
    },
  });

  const navigate = useNavigate();

  function onCloseHandler() {
    setIsModalOpen(false);
    setTimeout(() => navigate("../"), 500);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (
      !titleRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !deadlineRef.current.value.trim() ||
      !selectedImage
    ) {
      animate(
        "input, textarea",
        {
          borderColor: ["#DC0000", "#0f61ef"],
          x: [-10, 0, 10, 0],
        },
        { type: "spring", duration: 0.8, delay: stagger(0.03) }
      );
      return;
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    mutate({ challenge: { ...data, image: selectedImage } });
  }

  function selectImageHandler(path) {
    setSelectedImage(path);
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Modal title='New Challenge' onClose={onCloseHandler}>
          <form id='new-challenge' onSubmit={handleSubmit} ref={scope}>
            <p>
              <label htmlFor='title'>Title</label>
              <input ref={titleRef} type='text' name='title' id='title' />
            </p>

            <p>
              <label htmlFor='description'>Description</label>
              <textarea
                ref={descriptionRef}
                name='description'
                id='description'
              />
            </p>

            <p>
              <label htmlFor='deadline'>Deadline</label>
              <input
                ref={deadlineRef}
                type='date'
                name='deadline'
                id='deadline'
              />
            </p>
            {isFetchImgError && (
              <ErrorBlock
                title='Faield to fetch images'
                message={imgError.info?.message}
              />
            )}
            {isPendingImgs && <p>Loading images...</p>}
            <motion.ul
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              id='new-challenge-images'
            >
              {images &&
                images.map((image) => (
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: {
                        opacity: 1,
                        scale: [0.8, 1.2, 1],
                        transition: {},
                      },
                    }}
                    exit={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" }}
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
                  </motion.li>
                ))}
            </motion.ul>

            <p className='new-challenge-actions'>
              <button type='button' onClick={onCloseHandler}>
                Cancel
              </button>
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
      )}
    </AnimatePresence>
  );
}
