import { useQuery } from "@tanstack/react-query";
import { fetchChallenges } from "../util/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengesActions } from "../store/challenges";
import ChallengesTabs from "./ChallengesTabs";
import ChallengeItem from "./ChallengesItem";

export default function Challenges() {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
  });
  const { challenges } = useSelector((state) => ({
    challenges: state.challenges[state.challenges.selectedType],
  }));
  console.log(challenges);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(challengesActions.setChallenges({ challenges: data }));
    }
  }, [isSuccess, data]);

  return (
    <div id='challenges'>
      <ChallengesTabs>
        {challenges.map((item) => {
          return <ChallengeItem key={item.id} challenge={item}></ChallengeItem>;
        })}
      </ChallengesTabs>
    </div>
  );
}
