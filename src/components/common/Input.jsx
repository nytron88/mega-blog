import { forwardRef, useId } from "react"

function Input(
  {
    label,
    type = 'text',
    placeholder,
    className = '',
    ...props
  }, ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 pl-1 text-gray-300 font-medium"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 outline-none focus:border-purple-500 focus:bg-gray-800 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-500 transition-all duration-300 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
}

export default forwardRef(Input);