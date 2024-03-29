import { ButtonUnstyled } from "@mui/base";

interface TextButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export default function TextButton({
  onClick,
  text,
  className,
}: TextButtonProps) {
  return (
    <ButtonUnstyled
      onClick={() => onClick()}
      className={`p-2 w-full h-full rounded-lg bg-dark text-xs text-white hover:bg-dark-light duration-100 grid items-center ${className}`}
    >
      {text}
    </ButtonUnstyled>
  );
}
