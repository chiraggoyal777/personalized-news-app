import { CheckBadgeIcon } from "@heroicons/react/20/solid";

type BubbleCheckboxProps = {
  item: {
    id: string;
    label: string;
    group: string;
  };
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BubbleCheckbox = ({ item, checked, onChange }: BubbleCheckboxProps) => {
  const { id, group, label } = item;
  return (
    <label
      key={id}
      htmlFor={id}
      className="relative flex h-[8em] w-[8em] cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-full bg-light-theme text-center font-medium text-primary transition-all hover:bg-medium-theme has-[:checked]:bg-primary has-[:checked]:text-white"
    >
      <span
        className="peer mt-auto line-clamp-2 translate-y-1/2 px-[1em] leading-[1.125em] transition-transform has-[:checked]:translate-y-0"
        style={{
          fontSize: `clamp(0.75em, ${150 / label.length / 16}em, 1.25em)`,
          wordBreak: "break-word"
        }}
      >
        <span>{label}</span>
        <input
          name={group}
          id={id}
          value={id}
          type="checkbox"
          className="appearance-none"
          checked={checked}
          onChange={onChange}
        />
      </span>
      <div
        className="grid h-1/2 translate-y-full scale-0 place-items-center transition-transform peer-has-[:checked]:translate-y-0 peer-has-[:checked]:scale-100"
        aria-hidden="true"
      >
        <div className="rounded-full">
          <CheckBadgeIcon width="2em" height="2em" />
        </div>
      </div>
    </label>
  );
};

export default BubbleCheckbox;
