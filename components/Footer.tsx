import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 min-w-[350px] overflow-x-auto">
      <div className="center !px-10 !sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="list-none">
            <li>
              <Link
                href="/categories/658c3a8f525d3c2d504813ed_658c3b96525d3c2d50481441"
                prefetch={false}
                className="hover:text-gray-400">
                Phones
              </Link>
            </li>
            <li>
              <Link
                href="/categories/658c5cb4525d3c2d50482741"
                prefetch={false}
                className="hover:text-gray-400">
                Laptops
              </Link>
            </li>
            <li>
              <Link
                href="/categories/658c3ffd525d3c2d504814cb"
                prefetch={false}
                className="hover:text-gray-400">
                Gaming Consoles
              </Link>
            </li>
            <li>
              <Link
                href="/categories/658c3e9e525d3c2d50481493"
                prefetch={false}
                className="hover:text-gray-400">
                Headphones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="list-none">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                prefetch={false}
                className="hover:text-gray-400">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>
            {"Email: "}
            <Link
              prefetch={false}
              href="mailto:info@gizmonest.com"
              className="text-white hover:underline">
              info@gizmonest.com
            </Link>
          </p>
          <p>
            {"Phone: "}
            <Link
              prefetch={false}
              href="tel:+123456789"
              className="text-white hover:underline">
              +(123) 456-789
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex xl:space-x-4 flex-col xl:flex-row  ">
            <Link
              prefetch={false}
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-gray-400 flex gap-1 items-center">
              <IoLogoFacebook className="h-5 w-5 scale-110" /> Facebook
            </Link>
            <Link
              prefetch={false}
              href="https://twitter.com"
              target="_blank"
              className="hover:text-gray-400 flex gap-1 items-center">
              <FaSquareXTwitter className="h-5 w-5" /> Twitter
            </Link>
            <Link
              prefetch={false}
              href="https://www.instagram.com/"
              target="_blank"
              className="hover:text-gray-400 flex gap-1 items-center">
              <FaInstagramSquare className="h-5 w-5" /> Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} GizmoNest Tech Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
