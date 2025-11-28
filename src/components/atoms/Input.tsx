import React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full p-2 border rounded-xl outline-none ${props.className ?? ""}`}
      />
    );
  }
);
Input.displayName = "Input";