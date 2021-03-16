import { useContext } from "react";
import { ChallengesContext } from "../contexts/challengesContext";
import styles from "../styles/components/CompletedChallenges.module.css";
export const CompletedChallenges = () => {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed Challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};
