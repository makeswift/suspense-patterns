export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextInput({ name, label, error, ...props }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label htmlFor={name} className="text-md">
          {label}
        </label>
        <input {...props} className="text-black" type="text" name={name} />
      </div>
      <div className="text-red-500 text-sm">{error}</div>
    </div>
  )
}
