interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  return isLoading ? <div data-testid="loading" className="hidden" /> : <></>;
}
