import { cn } from "@/lib/cn";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export type CrumbType = {
  name: string;
  link: { pathname: string; query?: string };
};

type BreadcrumbsProps = {
  crumbs: CrumbType[];
  className?: string;
};

function Breadcrumbs({ crumbs, className }: BreadcrumbsProps) {
  return (
    <nav>
      <ol className={cn("flex gap-2 text-gray-800", className)}>
        {crumbs.map((crumb, index) => {
          const isLastElement = index === crumbs.length - 1;

          return (
            <li
              key={crumb.link.pathname}
              className={cn(
                "flex flex-nowrap items-center gap-1 text-xs sm:text-base  hover:drop-shadow-sm hover:text-black",
                isLastElement ? "font-semibold" : ""
              )}>
              <Link
                href={crumb.link}
                className={cn(isLastElement ? "cursor-default" : "")}>
                {crumb.name}
              </Link>
              {isLastElement ? null : (
                <IoIosArrowForward className="text-[#306c8a]" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
