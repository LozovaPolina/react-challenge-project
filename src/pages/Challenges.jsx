import Header from "../components/Header";
import Challenges from "../components/Challenges";
import { Outlet } from "react-router-dom";

export default function ChallengesPage() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
        <Challenges />
      </main>
    </>
  );
}
