import { forwardRef } from "react"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ name, label, error, ...rest }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <label htmlFor={name} className="text-md">
            {label}
          </label>
          <input
            className="text-black"
            type="number"
            ref={ref}
            name={name}
            {...rest}
          />
        </div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"
