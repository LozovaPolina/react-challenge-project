import { useDispatch, useSelector } from "react-redux";
import TabsItem from "./TabsItem";
import { challengesActions } from "../store/challenges";
// import { Children } from "react";

export default function ChallengesTab({ children }) {
  const { active, completed, failed, selectedType } = useSelector((state) => ({
    active: state.challenges.active,
    completed: state.challenges.completed,
    failed: state.challenges.failed,
    selectedType: state.challenges.selectedType,
  }));
  const dispatch = useDispatch();
  function onSelectType(type) {
    dispatch(challengesActions.setSelectedTab({ selectedType: type }));
  }
  return (
    <>
      <menu id='tabs'>
        <TabsItem
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={active.length}
        >
          Active
        </TabsItem>
        <TabsItem
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={completed.length}
        >
          Completed
        </TabsItem>
        <TabsItem
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={failed.length}
        >
          Failed
        </TabsItem>
      </menu>
      <div>{children}</div>
    </>
  );
}
