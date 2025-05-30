import { ReactNode } from "react";

interface OptionButtonProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function OptionButton({
  title,
  icon,
  onClick,
  className = "",
}: OptionButtonProps) {
  return (
    <button
      className={`bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className="font-bold text-lg mb-4">{title}</p>
      <div className="text-6xl mb-4">{icon}</div>
    </div>
  );
}
