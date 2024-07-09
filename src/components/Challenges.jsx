import { useQuery } from "@tanstack/react-query";
import { fetchChallenges } from "../util/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengesActions } from "../store/challenges";
import ChallengesTabs from "./ChallengesTabs";
import ChallengeItem from "./ChallengesItem";

export default function Challenges() {
  const { data } = useQuery({
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
    <div id='challenges'>
      <ChallengesTabs>
        <ol className='challenge-items'>
          {challenges.map((item) => {
            return (
              <ChallengeItem key={item.id} challenge={item}></ChallengeItem>
            );
          })}
        </ol>
      </ChallengesTabs>
    </div>
  );
}
