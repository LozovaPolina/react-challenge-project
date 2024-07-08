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
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(challengesActions.setChellenges(data));
  //   }
  // }, [isSuccess, data]);
  console.log(data);
  return <h1>fdsfs</h1>;
}
