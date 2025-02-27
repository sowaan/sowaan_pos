export function CustomInput({ label, id, icon, ...rest }) {
  return (
    <div className="relative w-full mb-4">
      <label htmlFor={id} className="leading-7 text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="disabled:opacity-75 disabled:bg-gray-100 w-full  bg-white rounded-lg border border-gray-300 focus:border-[#0277fa] focus:ring-2 focus:ring-[#3f99ff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      {icon && (
        <div
          className="absolute inset-y-0 end-0 flex items-center pe-3 pt-7"
        >
          {icon}
        </div>
      )}
    </div>
  );
}
