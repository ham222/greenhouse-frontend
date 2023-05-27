interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  console.log(isLoading);
  return isLoading ? <div data-testid="loading" className="hidden" /> : <></>;
}
