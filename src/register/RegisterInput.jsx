export default function RegisterInput({
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
          ? "border-red-500 focus:ring-red-300 focus:border-red-500 outline-red-500"
          : "border-gray-950 focus:ring-gray-950"
      }`}
      value={value}
      onChange={onChange}
      name={name}
      hasError={hasError}
    />
  );
}

// className={`block w-full border rounded-md outline-none px-4 p-1 py-2
// focus:ring ${
//   hasError
//     ? "border-red-500 focus:ring-red-300 focus:border-red-500"
//     : "border-black focus:ring-black"
// }`}
