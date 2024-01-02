import SpinnerCircle from "@/components/SpinnerCircle";

function Loading() {
  return (
    <div className="center h-screen flex justify-center ">
      <SpinnerCircle className="scale-[300%] -translate-y-16" />
    </div>
  );
}

export default Loading;
