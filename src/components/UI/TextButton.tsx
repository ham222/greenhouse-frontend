import { ButtonUnstyled } from "@mui/base";

interface TextButtonProps {
  onClick: () => void;
  text: string;
}

export default function TextButton({ onClick, text }: TextButtonProps) {
  return (
    <ButtonUnstyled
      onClick={() => onClick()}
      className="p-2 w-full h-full rounded-lg bg-dark text-xs text-white hover:bg-dark_hover duration-100 grid items-center"
    >
      {text}
    </ButtonUnstyled>
  );
}
