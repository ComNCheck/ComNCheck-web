"use client";
import { BiUserCircle } from "react-icons/bi";
import logo from "../../public/images/logo.png"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogin = () => {
    console.log("Google 로그인 시도 중...");
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseURL}/oauth2/authorization/google`;
  };

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
        <div className="flex items-center justify-between font-semibold lg:text-base text-xs md:text-sm lg:gap-4 gap-8 cursor-pointer">
          <div onClick={() => router.push("/past-event")}>인수인계</div>
          <div onClick={() => router.push("/calendar")}>행사일정</div>
          <div onClick={() => router.push("/popularEvent")}>행사투표</div>
          <BiUserCircle className="text-xl" onClick={handleLogin}/>
        </div>
      </div>
    </header>
  );
}
