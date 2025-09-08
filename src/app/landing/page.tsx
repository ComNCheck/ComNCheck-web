import Image from "next/image";
export default function Landing() {
  return (
    <div className="min-h-screen w-screen grid place-items-center bg-[#f1f4fa] ">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 px-4 py-12">
        <div className="flex flex-col space-y-6 text-center lg:text-left">
          <div className="font-extrabold text-black text-4xl">
            한국외대 컴공 생활,
          </div>
          <div className="font-extrabold text-[#0077FF] text-6xl">
            이제 더 편리하게
          </div>
          <div className="text-lg font-medium text-[#64758B]">
            카톡방에서 놓친 공지, 홈페이지 확인하기 귀찮은 당신을 위해.
            <br />
            학부 공지부터 행사 소식까지, ComNCheck에서 한 번에 확인하세요.
          </div>

          <button className="mt-4 rounded-lg bg-[#0077FF] w-50 h-15 px-6 py-3 text-lg font-semibold text-white hover:bg-[#005fcc] transition">
            서비스 시작하기 →
          </button>
          <div className="flex flex-row items-center gap-2">
            <Image src="/images/name_ld.png" alt="이름" width={160} height={36} />
            <span className="text-[#64758b] font-semibold text-sm">
              +100 명이 이미 사용하고 있어요
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start space-y-14 text-center">
          <div className="font-bold text-2xl">
            안녕하세요,
            <br /> 이제 회원님이 필요한{" "}
            <span className="text-[#0077ff]">공지</span>
            들을 알려드릴게요
          </div>
          <div>
            <Image
              src="/images/textlogo.png"
              alt="컴첵로고"
              width={150}
              height={36}
              className="mx-auto"
            />
            <Image
              src="/images/logo.png"
              alt="로고"
              width={200}
              height={200}
              className="mx-auto mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
