interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function SubmitButton({ onClick, disabled = false, children = "Next" }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
} 