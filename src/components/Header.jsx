import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header id='main-header'>
        <h1>Your Challenges</h1>
        <Link className='button' to='/challenges/new'>
          Add Challenge
        </Link>
      </header>
    </>
  );
}
