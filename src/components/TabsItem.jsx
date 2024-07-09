export default function TabsItem({ isSelected, onSelect, children }) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        {/* <Badge caption={badgeCaption}></Badge> */}
      </button>
      {isSelected && <div className='active-tab-indicator' />}
    </li>
  );
}
