import clsx from "clsx";
interface ActionButtonProps {
  variant?: "primary" | "default";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ActionButton = ({
  variant = "default",
  children,
  onClick,
  type,
  disabled
}: ActionButtonProps) => {
  return (
    <button
      className={clsx(
        "block w-max rounded px-5 py-2 text-center text-base font-medium transition-all focus:shadow-[0_0_0_2px] focus:shadow-primary/50 focus:outline-none active:scale-95",
        {
          "hover:bg-primaryShade bg-primary text-white": variant === "primary",
          "bg-transparent text-primary hover:bg-light-theme":
            variant === "default"
        }
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
