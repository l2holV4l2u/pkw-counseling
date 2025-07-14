export function Navbar({
  items,
  select,
  setSelect,
  className,
}: {
  items: string[];
  select: number;
  setSelect: (d: number) => void;
  className?: string;
}) {
  return (
    <nav
      className={`grid gap-8 w-full border-b-[1px] border-gray-300 ${className}`}
    >
      {items.map((item, index) => (
        <div
          onClick={() => setSelect(index)}
          className={`text-gray-700 cursor-pointer font-semibold ${
            select == index && "border-b-[2px] border-primary-500"
          }`}
        >
          {item}
        </div>
      ))}
    </nav>
  );
}
