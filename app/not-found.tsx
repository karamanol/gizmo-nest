import Link from "next/link";

function NotFound() {
  return (
    <div className="center pt-6">
      <div className="bg-white h-screen flex flex-col gap-12 justify-center items-center p-12 rounded-md">
        <p className="text-4xl">Page Not found 🥹</p>
        <span className="text-center">
          The page might have been moved, deleted, or perhaps it never existed.
          You might want to check the URL again, go back to the previous page,
          or just head straight to our{" "}
          <Link href={"/"} className="text-blue-800">
            homepage.
          </Link>
        </span>
      </div>
    </div>
  );
}

export default NotFound;
