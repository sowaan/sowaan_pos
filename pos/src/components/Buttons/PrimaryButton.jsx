const PrimaryButton = ({ type, text, onClick, ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
      className="text-white w-full disabled:bg-gray-400 bg-[#0277fa] hover:bg-[#0275ef] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-8 py-2"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
