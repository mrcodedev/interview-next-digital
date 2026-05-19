interface UserInitialsAvatarProps {
  name: string;
  containerClassName: string;
  textClassName: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const UserInitialsAvatar = ({
  name,
  containerClassName,
  textClassName,
}: UserInitialsAvatarProps) => (
  <div className={containerClassName}>
    <span className={textClassName}>{getInitials(name)}</span>
  </div>
);
