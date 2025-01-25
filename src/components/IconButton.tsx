import clsx from "clsx";
import AppTooltip from "./Tooltip";

interface Props {
  additionalClasses?: string;
  tooltipText?: string;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

const IconButton = ({
  additionalClasses,
  tooltipText,
  icon,
  onClick,
  disabled
}: Props) => {
  const BaseButton = () => {
    return (
      <button
        className={clsx(
          "flex h-14 w-14 items-center justify-center rounded-full bg-light-theme text-center text-xl text-primary transition-all hover:bg-medium-theme focus:shadow-[0_0_0_2px] focus:shadow-medium-theme focus:outline-none",
          { additionalClasses: additionalClasses }
        )}
        onClick={onClick}
        disabled={disabled}
        aria-label={tooltipText}
        type="button"
      >
        {icon}
      </button>
    );
  };
  if (tooltipText) {
    return (
      <AppTooltip content={tooltipText}>
        <BaseButton />
      </AppTooltip>
    );
  } else {
    return <BaseButton />;
  }
};

export default IconButton;
