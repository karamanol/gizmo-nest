import { IoIosLaptop } from "react-icons/io";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiAppleLine } from "react-icons/ri";
import { PiAndroidLogo } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaHeadphones } from "react-icons/fa6";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsTabletLandscape } from "react-icons/bs";
import { MdDeviceUnknown } from "react-icons/md";
import { Category, CategoryType } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Link from "next/link";
import { cn } from "@/lib/cn";

const className = "h-20 w-20";
const icons: { [key: string]: JSX.Element } = {
  laptop: <IoIosLaptop className={cn(className, "scale-125")} />,
  mobile: <IoPhonePortraitOutline className={className} />,
  ios: <RiAppleLine className={className} />,
  android: <PiAndroidLogo className={className} />,
  tv: <PiTelevisionSimpleBold className={cn(className, "scale-90")} />,
  headphone: <FaHeadphones className={cn(className, "scale-75")} />,
  console: <IoGameControllerOutline className={className} />,
  tablet: <BsTabletLandscape className={className} />,
  unknown: <MdDeviceUnknown className={className} />,
};

const sixHoursInSeconds = 3600 * 6;
export const revalidate = sixHoursInSeconds;

async function CategoriesPage() {
  await mongooseConnect();
  const categories: Array<CategoryType> = await Category.find();

  // find all categories that can have children
  const arrWithParents = categories.reduce<string[]>(
    (parentsFound, category) =>
      typeof category.parentCat !== "undefined" &&
      !parentsFound.includes(category.parentCat.toString())
        ? [...parentsFound, category.parentCat.toString()]
        : parentsFound,
    []
  );

  return (
    <main className="center pt-6">
      <h2 className="text-3xl mb-2 text-gray-800 font-semibold">Categories:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 bg-white p-3 rounded-md text-gray-800">
        {categories.map((cat, _i, arr) => {
          const haveChildren = arrWithParents.includes(cat._id.toString());
          let link = cat._id.toString();
          if (haveChildren) {
            const arrWithChildrenIds = arr
              .filter((el) => el.parentCat?.toString() === cat._id.toString())
              .map((el) => el._id.toString());
            link = arrWithChildrenIds.join("_");
          }
          return (
            <article
              className="h-44 flex flex-col items-center justify-between p-2 "
              key={cat._id.toString()}>
              <Link
                href={`/categories/${link}`}
                className="flex flex-col items-center h-full w-full justify-around border rounded-md hover:bg-slate-100 transition-colors ">
                <span>
                  {Object.keys(icons).includes(cat.name.toLowerCase())
                    ? icons[cat.name?.toLowerCase()]
                    : icons.unknown}
                </span>
                <p className="text-center font-semibold">{cat.name}</p>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default CategoriesPage;
