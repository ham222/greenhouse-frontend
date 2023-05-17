import { ButtonUnstyled } from "@mui/base";

interface TextButtonProps {
  onClick: () => void;
  text: string;
}

export default function TextButton({ onClick, text }: TextButtonProps) {
  return (
    <ButtonUnstyled
      onClick={() => onClick()}
      className="p-2 w-full h-full rounded-lg bg-[#202329] text-xs text-white hover:bg-[#393e49] duration-100 grid items-center"
    >
      {text}
    </ButtonUnstyled>
  );
}
