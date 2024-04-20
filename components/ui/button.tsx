import React from "react";

interface ButtonType {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean | undefined;
}

export default function Button({
  children,
  className,
  onClick,
  type,
  disabled,
}: ButtonType) {
  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
