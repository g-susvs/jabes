export const ProductsSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {Array.from({ length: 4 }).map((_i, index) => (
        <div key={index} className="flex flex-col animate-pulse">
          <div className="min-w-[280px] w-full max-w-[320px] h-[250px] bg-gray-300 rounded-2xl"></div>
          <div className="flex flex-col p-4 gap-4">
            <div className="w-40 h-4 bg-gray-300 rounded-2xl"></div>
            <div className="w-60 h-8 bg-gray-300 rounded-2xl"></div>
            <div className="w-40 h-4 bg-gray-300 rounded-2xl"></div>
            <div className="h-10 bg-gray-300 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
