import { useMutation } from "@tanstack/react-query";
import { changeChallengeStatus, queryClient } from "../util/http";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function ChallengeItem({ challenge }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: changeChallengeStatus,

    onSettled: () => {
      queryClient.invalidateQueries(["challenges"]);
    },
  });

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
  const onCompleteHandler = () => {
    if (challenge.status === "completed") return;
    mutate({ status: "completed", id: challenge.id });
  };

  const onFailHandler = () => {
    if (challenge.status === "failed") return;
    mutate({ status: "failed", id: challenge.id });
  };
  const onDetailsHandler = () => setIsExpanded(!isExpanded);

  return (
    <motion.li layout exit={{ y: -20, opacity: 0 }}>
      <article className='challenge-item'>
        <header>
          <img src={`http://localhost:3000/${challenge.image}`} />

          <div className='challenge-item-meta'>
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>

            <p className='challenge-item-actions'>
              <>
                <button
                  disabled={isPending}
                  className='btn-negative'
                  onClick={onFailHandler}
                >
                  Mark as failed
                </button>
                <button disabled={isPending} onClick={onCompleteHandler}>
                  Mark as completed
                </button>
              </>
              {isPending && "transferring ..."}
            </p>
          </div>
        </header>
        <div className={`challenge-item-details `}>
          <p>
            <button onClick={onDetailsHandler}>
              View Details{" "}
              <motion.span
                animate={{
                  rotate: isExpanded ? 180 : 0,
                }}
                className='challenge-item-details-icon'
              >
                &#9650;
              </motion.span>
            </button>
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className='challenge-item-description'>
                  {challenge.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
