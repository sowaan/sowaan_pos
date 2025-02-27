const CardLoader = () => {
  return (
    <div className="bg-white p-2 rounded-lg shadow flex sm:flex-col cursor-pointer transition duration-300 ease-in-out">
      <div className="w-20 sm:w-full h-20 sm:h-40 object-cover mb-0 sm:mb-2 rounded-lg bg-gray-200" />
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-gray-200" />
            <div className="col-span-1 h-2 rounded bg-gray-200" />
          </div>
          <div className="h-2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
