export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="mx-auto w-full max-w-screen-xl p-12">
        <div className="grid gap-10  md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h2 className="mb-2 text-lg font-bold">ComNCheck</h2>
            <p className="text-sm leading-relaxed">
              한국외국어대학교 컴퓨터공학부 학생들을 위한 통합 정보 플랫폼으로,
              <br />
              학부 생활의 모든 정보를 한 곳에서 확인할 수 있습니다.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">서비스</h2>
            <nav className="flex flex-col space-y-1 text-sm">
              <a href="#" className="hover:underline">
                어플소개
              </a>
              <a href="#" className="hover:underline">
                제휴제안
              </a>
              <a href="#" className="hover:underline">
                이용약관
              </a>
              <a href="#" className="hover:underline">
                개인정보처리방침
              </a>
            </nav>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">문의</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <b>| G-mail.</b> comncheck0306@gmail.com
              </li>
              <li>
                <b>| instagram.</b> @comncheck
              </li>
            </ul>
          </div>
        </div>
        <div className="my-10 h-px w-full bg-white" />
        <p className="text-center text-xs">
          © 2025 ComNCheck. 한국외국어대학교 컴퓨터공학부 학생이 만든
          서비스입니다.
        </p>
      </div>
    </footer>
  );
}
