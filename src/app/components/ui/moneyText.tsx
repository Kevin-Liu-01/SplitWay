export default function MoneyText({ amount, className, ...props }) {
  return (
    <span className={`font-inconsolata ${className}`} {...props}>
      {"$" + amount}
    </span>
  );
}
