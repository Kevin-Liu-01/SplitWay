export function Button({ children, onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
