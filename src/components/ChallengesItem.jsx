export default function ChallengeItem({ challenge }) {
  return (
    <li>
      <article className='challenge-item'>
        <header>
          <img src={`http://localhost:3000/${challenge.image}`} />
          <div className='challenge-item-meta'>
            <h2>{challenge.title}</h2>
            {/* <p>Complete until {formattedDate}</p> */}
            <p className='challenge-item-actions'>
              <button className='btn-negative'>Mark as failed</button>
              <button>Mark as completed</button>
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
