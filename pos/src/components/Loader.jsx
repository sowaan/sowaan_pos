const Loader = ({ message }) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white dark:bg-gray-800">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <div>{message}</div>
    </div>
  );
};

export default Loader;
