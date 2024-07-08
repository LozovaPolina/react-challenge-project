import { useQuery } from "@tanstack/react-query";
import { fetchChallenges } from "../util/http";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { challengesActions } from "../store/challenges";

export default function Challenges() {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(challengesActions.setChallenges({ challenges: data }));
    }
  }, [isSuccess, data]);
  console.log(data);
  return <div id='challenges'>{isPending && <p>Loading challenges</p>}</div>;
}
