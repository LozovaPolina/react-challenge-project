import { useQuery } from "@tanstack/react-query";
import { fetchChallenges } from "../util/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengesActions } from "../store/challenges";
import ChallengesTabs from "./ChallengesTabs";
import ChallengeItem from "./ChallengesItem";
import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorBlock from "./UI/ErrorBlock";
import { AnimatePresence, motion } from "framer-motion";

export default function Challenges() {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
    staleTime: 60 * 3000,
  });

  const { challenges } = useSelector((state) => ({
    challenges: state.challenges[state.challenges.selectedType],
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(challengesActions.setChallenges({ challenges: data }));
    }
  }, [data, dispatch]);

  return (
    <>
      <div id='challenges'>
        {isPending && (
          <div className='center'>
            <LoadingIndicator />
          </div>
        )}
        {isError && (
          <ErrorBlock
            title='Failed to fetch challenges.'
            message={error.info?.message || "Please try again later ;)"}
          />
        )}

        {isSuccess && (
          <ChallengesTabs>
            {challenges.length > 0 && (
              <ol className='challenge-items'>
                <AnimatePresence>
                  {challenges.map((item) => (
                    <ChallengeItem key={item.id} challenge={item} />
                  ))}
                </AnimatePresence>
              </ol>
            )}
            {challenges.length === 0 && (
              <motion.p
                key='fallback'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                You have not added a challenge yet.
              </motion.p>
            )}
          </ChallengesTabs>
        )}
      </div>
    </>
  );
}
