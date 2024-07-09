import { useMutation } from "@tanstack/react-query";
import { changeChallengeStatus, queryClient } from "../util/http";

export default function ChallengeItem({ challenge }) {
  const { mutate, isPending } = useMutation({
    mutationFn: changeChallengeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["challenges"]);
    },
  });

  const onCompleteHandler = () => {
    if (challenge.status === "completed") return;
    mutate({ status: "completed", id: challenge.id });
  };

  const onFailHandler = () => {
    if (challenge.status === "failed") return;
    mutate({ status: "failed", id: challenge.id });
  };

  return (
    <li>
      <article className='challenge-item'>
        <header>
          <img src={`http://localhost:3000/${challenge.image}`} />
          <div className='challenge-item-meta'>
            <h2>{challenge.title}</h2>
            {/* <p>Complete until {formattedDate}</p> */}
            <p className='challenge-item-actions'>
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
            </p>
          </div>
        </header>
        <div className='challenge-item-details'>
          <p>
            <button>
              View Details{" "}
              <span className='challenge-item-details-icon'>&#9650;</span>
            </button>
          </p>

          {/* {isExpanded && (
            <div>
              <p className='challenge-item-description'>
                {challenge.description}
              </p>
            </div>
          )} */}
        </div>
      </article>
    </li>
  );
}
