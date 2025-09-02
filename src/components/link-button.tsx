import { AnchorHTMLAttributes, ReactNode } from "react";

interface ILinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isLoading?: boolean;
  children?: ReactNode
  variant?: keyof typeof buttonVariants;
}

const buttonVariants = {
  loading: 'cursor-wait bg-gray-900 border-2 border-gray-800 hover:bg-gray-800',
  default: 'bg-blue-900 border-2 border-blue-800 hover:bg-blue-800 cursor-pointer',
  outlined: 'text-blue-600 border-2 border-blue-800 bg-transparent hover:bg-blue-800/20 cursor-pointer',
}

export function LinkButton(props: ILinkButtonProps) {
  const {
    isLoading = false,
    variant = 'default',
    children,
    className,
    ...rest
  } = props;

  return (
    <a
      role="button"
      href="#"
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
    </a>
  )
}