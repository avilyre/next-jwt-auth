import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: ReactNode
  variant?: keyof typeof buttonVariants;
}

const buttonVariants = {
  loading: 'cursor-wait bg-gray-900 border-2 border-gray-800 hover:bg-gray-800',
  default: 'bg-blue-900 border-2 border-blue-800 hover:bg-blue-800 cursor-pointer',
  outlined: 'text-blue-600 border-2 border-blue-800 bg-transparent hover:bg-blue-800/20 cursor-pointer',
}

export function Button(props: IButtonProps) {
  const {
    type = 'button',
    isLoading = false,
    variant = 'default',
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={
        `rounded-md px-4 py-2 w-full flex items-center justify-center
          ${isLoading
            ? buttonVariants.loading
            : buttonVariants[variant]}
          ${className}
        `}
      {...rest}
    >
      {!isLoading ? children : <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
    </button>
  )
}