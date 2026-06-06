const SelectableButton = ({
  options,
  selected,
  onChange,
}: any) => {
  return (
    <div
      className="relative inline-block"
    >
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="
        appearance-none
        rounded-lg
        border border-[#3c3c3c]
        bg-gradient-to-b from-[#2b2b2b] to-[#1f1f1f]
        px-4 py-2 pr-10
        text-sm font-medium text-[#e5e5e5]
        shadow-md
        outline-none
        cursor-pointer
        transition-all duration-200
        hover:border-[#6b7280]
        focus:ring-2 focus:ring-indigo-500
        "
      >
        {options.map((option: any) => {
          return (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#1f1f1f] text-[#e5e5e5]"
            >
              {option.label}
            </option>
          );
        })}
      </select>

      {/* Animated Arrow */}
      <span
        className="
        pointer-events-none
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        text-gray-400
        text-xs
        "

      >
        ▼
      </span>
    </div>
  );
};

export default SelectableButton;