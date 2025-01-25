import AppTooltip from "./Tooltip";

interface Props {
  tooltipText: string;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

const FloaterButton = ({
  isActive,
  tooltipText,
  icon,
  onClick,
  disabled
}: Props) => {
  return (
    <AppTooltip content={tooltipText}>
      <button
        className={`fixed bottom-4 right-4 z-10 inline-flex items-center justify-center rounded-full p-4 font-medium leading-none shadow-lg ${
          isActive
            ? "bg-active text-white hover:bg-active-shade"
            : "bg-primary text-white hover:bg-primary-shade"
        }`}
        onClick={onClick}
        disabled={disabled}
        aria-label={tooltipText}
      >
        {icon}
        {/* {isActive && (
          <sup className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-900"></sup>
        )} */}
      </button>
    </AppTooltip>
  );
};

export default FloaterButton;
