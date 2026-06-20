import { forwardRef } from 'react'
import { cn } from '@/app/components/ui/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[#111] text-white border-transparent hover:bg-[#1E3A8A]',
  outline:
    'bg-white text-[#111] border-[#EAEAEA] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]',
  ghost:
    'bg-transparent text-[#555] border-transparent hover:bg-[#F5F5F5] hover:text-[#111]',
  destructive:
    'bg-red-600 text-white border-transparent hover:bg-red-700',
}

const SIZES: Record<ButtonSize, string> = {
  xs: 'h-7 px-3 text-xs rounded-lg',
  sm: 'h-8 px-3.5 text-xs rounded-lg',
  md: 'h-10 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-sm rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative overflow-hidden inline-flex items-center justify-center gap-2',
          'font-medium border transition-all duration-200',
          'hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98] active:translate-y-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/40 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'cursor-pointer group select-none',
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-x-[-105%] group-hover:translate-x-[105%] transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
