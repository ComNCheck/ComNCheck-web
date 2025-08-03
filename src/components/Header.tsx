import { BiUserCircle } from "react-icons/bi";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 flex flex-col items-center justify-center h-18 text-[#64758B] bg-white z-100">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-8 lg:w-[70%] ">
        <Link href="/" className="relative h-12 w-28 shrink-0">
          <Image
            src={logo}
            alt="로고"
            fill
            priority
            sizes="(max-width: 768px) 112px, 140px"
            className="object-contain"
          />
        </Link>
        <div className="flex items-center justify-between font-semibold lg:text-base text-sm lg:gap-4 gap-8">
          <div>인수인계</div>
          <div>행사일정</div>
          <div>행사투표</div>
          <BiUserCircle className="text-xl" />
        </div>
      </div>
    </header>
  );
}
