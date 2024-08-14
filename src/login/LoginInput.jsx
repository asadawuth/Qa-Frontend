export default function LoginInput({
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full rounded-md outline-none h-6   opacity-80 pt-3 pb-3 pl-3 p-4"
      value={value}
      onChange={onChange}
    />
  );
}

//text-black focus:outline-black border-8
