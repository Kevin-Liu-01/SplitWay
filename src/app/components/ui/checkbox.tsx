export function Checkbox({ checked, onCheckedChange, className, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)} // Ensuring to pass the checked value
      className={`size-5 flex-none accent-blue-500 cursor-pointer ${className}`}
      {...props}
    />
  );
}
