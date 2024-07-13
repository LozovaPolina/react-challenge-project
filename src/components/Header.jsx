import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Header() {
  return (
    <>
      <header id='main-header'>
        <h1>Your Challenges</h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Link className='button' to='/challenges/new'>
            Add Challenge
          </Link>
        </motion.div>
      </header>
    </>
  );
}
