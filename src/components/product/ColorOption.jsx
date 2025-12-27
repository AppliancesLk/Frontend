export default function ColorOption({
  color,
  selected,
  disabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-9 h-9 rounded-full border-2
        ${selected ? "border-black" : "border-gray-300"}
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
        transition
      `}
      style={{ backgroundColor: color.toLowerCase() }}
    />
  );
}
