export default function ResetPasswordInput({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  hasError,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`block w-full border rounded-md outline-none px-4 p-1 py-2 
          focus:ring ${
            hasError
              ? "border-gray-950 focus:ring-gray-950 focus:border-gray-950 outline-gray-950"
              : ""
          }`}
      value={value}
      onChange={onChange}
      name={name}
      hasError={hasError}
    />
  );
}
