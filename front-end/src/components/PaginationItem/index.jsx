export default function PaginationItem({
  isActice,
  isDisable,
  onClick,
  children,
}) {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className={`w-[40px] h-[40px] flex items-center justify-center rounded border ${isActice ? "bg-blue-500 text-white":""} ${isDisable ? "bg-[#dcd8d8] text-[#a09d9d]":""}`}
    >
      {children}
    </button>
  );
}
