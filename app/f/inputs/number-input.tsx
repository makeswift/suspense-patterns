export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: string[]
}

export function NumberInput({ name, label, errors, ...props }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label htmlFor={name} className="text-md">
          {label}
        </label>
        <input {...props} className="text-black" type="number" name={name} />
      </div>
      {errors?.map((error, index) => (
        <div key={index} className="text-red-500 text-sm">
          {error}
        </div>
      ))}
    </div>
  )
}
