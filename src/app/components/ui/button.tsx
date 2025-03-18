import { Tooltip } from "@radix-ui/themes";

export function Button({ children, onClick, className, tooltip, ...props }) {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${className}`}
        {...props}
      >
        {children}
      </button>
    </Tooltip>
  );
}
