import { motion } from "framer-motion";
import Badge from "./Badge";

export default function TabsItem({
  isSelected,
  onSelect,
  children,
  badgeCaption,
}) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge
          key={`${badgeCaption}_${children}`}
          caption={badgeCaption}
        ></Badge>
      </button>
      {isSelected && (
        <motion.div layoutId='tab-indicator' className='active-tab-indicator' />
      )}
    </li>
  );
}
