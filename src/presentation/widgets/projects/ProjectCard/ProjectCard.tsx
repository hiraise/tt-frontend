import { ICONS } from "@/infrastructure/config/icons";
import styles from "./ProjectCard.module.css";
import { Icon } from "@/presentation/ui/Icon";
import { pluralizeTasks } from "@/shared/utils/pluralizeTasks";
import { Project } from "@/domain/project/project.entity";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.cardInfoWrapper}>
        <Icon as={ICONS.project} size="24px" />
        <span>{pluralizeTasks(project.totalTasks)}</span>
      </div>
      <div className={styles.cardTextWrapper}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
