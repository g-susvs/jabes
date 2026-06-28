export const ReleatedProductsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_i, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-line bg-card"
        >
          <div className="h-[200px] w-full bg-line/60"></div>
          <div className="flex flex-col gap-3 p-5">
            <div className="h-4 w-20 rounded-full bg-line/60"></div>
            <div className="h-6 w-40 rounded bg-line/60"></div>
            <div className="h-4 w-full rounded bg-line/60"></div>
          </div>
        </div>
      ))}
    </>
  );
};
