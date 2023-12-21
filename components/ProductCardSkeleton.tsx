export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-md bg-white p-4 gap-3 drop-shadow-sm flex flex-col justify-center items-center relative overflow-hidden blur-sm ">
      <div className="bg-gray-100 h-40 w-full rounded-md "></div>
      <div className=" bg-gray-200 h-6 w-14 rounded-md blur-sm"></div>
      <div className="flex justify-between gap-16 items-center ">
        <div className="h-6 w-14 bg-gray-200 rounded-md blur-sm"></div>
        <div className="bg-blue-100 h-8 w-8 rounded-md blur-sm"></div>
      </div>
      <div className="inset-0 absolute bg-gradient-to-r from-transparent via-gray-400/60 to-transparent skeleton-animation"></div>
    </div>
  );
}
