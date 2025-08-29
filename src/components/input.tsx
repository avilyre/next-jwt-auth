import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input(props: IInputProps) {
  const {
    name,
    placeholder,
    label,
    error
  } = props;

  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className="bg-gray-900/50 border-2 border-gray-800 rounded-md px-4 py-2"
      />
      
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  )
}