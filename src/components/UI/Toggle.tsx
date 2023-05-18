import { Switch } from "@headlessui/react";

export interface ToggleProps {
  value: boolean;
  updateValue: () => void;
}

export default function Toggle({ value, updateValue }: ToggleProps) {
  return (
    <div>
      <Switch
        checked={value}
        onChange={updateValue}
        className={`${
          value ? "bg-neon" : "bg-stone-400"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-dark transition`}
        />
      </Switch>
    </div>
  );
}
