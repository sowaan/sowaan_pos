import { IconButton } from "@material-tailwind/react";

const CardItem = ({ title, image, price, qty, onAdd, onSubtract, onRemove }) => {
  return (
    <div className="flex flex-wrap mb-5">
      <div className="h-full w-full flex flex-row items-center justify-center text-left">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-20 h-20 object-cover object-center sm:mb-0 mb-4"
          src={image ? image : "https://dummyimage.com/200x200"}
        />
        <div className="flex-grow pl-4">
          <div className="flex justify-between text-start items-center">
            <h2 className="title-font font-medium mb-1 text-gray-900">
              {title}
            </h2>
            <IconButton
              variant="text"
              color="red"
              className="rounded-full cursor-pointer"
              onClick={onRemove}
            >
              <i className="fas fa-trash" />
            </IconButton>
          </div>
          <div className="flex justify-between text-center items-center">
            <div className="inline-flex">
              <button
                onClick={onSubtract}
                className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
              >
                <i className="fas fa-minus" />
              </button>
              <button className="bg-gray-300 text-gray-800 font-bold py-1 px-1">
                {qty}
              </button>
              <button
                onClick={onAdd}
                className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
            <h3 className="text-[#0277fa] font-bold">{price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
