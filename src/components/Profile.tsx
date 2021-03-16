import { useContext } from "react";
import { ChallengesContext } from "../contexts/challengesContext";
import styles from "../styles/components/Profile.module.css";

export const Profile = () => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/36972831?s=400&v=4"
        alt="igor"
      />
      <div>
        <strong>Igor Pignatari</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          level {level}
        </p>
      </div>
    </div>
  );
};
