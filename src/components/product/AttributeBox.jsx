export default function AttributeBox({
  label,
  selected,
  disabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md border text-sm font-medium
        ${selected ? "border-black bg-black text-white" : "border-gray-300"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-black"}
        transition
      `}
    >
      {label}
    </button>
  );
}
