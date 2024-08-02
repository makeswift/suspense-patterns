import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as Label from "@radix-ui/react-label"

export interface Props {
  label: string
  name: string
  value?: string
  onChange: (value: string) => void
  defaultValue?: string
  options: {
    label: string
    value: string
  }[]
  required?: boolean
}

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  defaultValue,
  options,
  required,
}: Props) {
  return (
    <div className="space-y-2">
      <Label.Root className="text-lg font-bold">{label}</Label.Root>
      <RadioGroupPrimitive.Root
        name={name}
        className="flex flex-col gap-2.5 peer"
        defaultValue={defaultValue}
        aria-label={label}
        value={value}
        onValueChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <div className="flex items-center" key={option.value}>
            <RadioGroupPrimitive.Item
              className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
              value={option.value}
              id={option.value}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
            </RadioGroupPrimitive.Item>
            <label
              className="text-white text-[15px] leading-none pl-[15px]"
              htmlFor="r1"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    </div>
  )
}
