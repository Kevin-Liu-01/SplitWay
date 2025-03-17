export function Card({ children, className, ...props }) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`text-gray-800 flex-col flex ${className}`} {...props}>
      {children}
    </div>
  );
}
