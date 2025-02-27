const Card = ({ image, title, price, onClick, selectedQTY }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-2 rounded-lg shadow flex flex-row sm:flex-col cursor-pointer transition duration-300 ease-in-out"
    >
      <img
        src={image}
        loading="lazy"
        alt="Product"
        className="w-20 sm:w-full h-20 sm:h-40 object-cover mb-0 sm:mb-2 bg-gray-400 rounded-lg"
      />
      <div className="flex-grow px-2">
        <div className="flex flex-col h-full justify-between">
          <h3 className="text-gray-800 font-semibold ">{title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-blue-500 font-bold">{price}</p>
            <p className="text-gray-400 text-sm">{selectedQTY}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
