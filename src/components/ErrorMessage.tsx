interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
    ERROR: {message}
  </div>
);
