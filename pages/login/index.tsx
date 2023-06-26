import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [isName, setName] = useState<string | undefined>();
  const [isPassWord, setPassWord] = useState<string | undefined>();

  const router = useRouter();
  const LoginOnClick = (name: string | undefined, pw: string | undefined) => {
    if (name === "") {
      alert("ID를 입력해주세요 ");
      return;
    }
    if (name !== "admin") {
      alert("존재하지 않는 아이디입니다. 관리자에게 문의해주세요");
      return;
    }
    if (isPassWord === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (isPassWord !== "1111") {
      alert("비밀번호가 틀렸습니다.");
      return;
    }
    alert("로그인성공");
    router.push("/main");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        autoPlay
        //loop
        muted
      >
        <source src="/video/211224_greenbricks_4.mp4" type="video/mp4" />
      </video>
      <div className="z-10 rounded bg-white p-8 opacity-90 shadow">
        <div className="backdrop-blur backdrop-filter">
          <h2 className="mb-4 text-2xl font-bold">
            <div>- GreenBricks </div>
            <div>Banner Web Crawling Funtion</div>
          </h2>
          <form>
            <input
              className="mb-4 w-full rounded border border-gray-300 bg-transparent p-2 backdrop-blur backdrop-filter"
              type="text"
              placeholder="Username"
              value={isName}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="mb-4 w-full rounded border border-gray-300 bg-transparent p-2 backdrop-blur backdrop-filter"
              type="password"
              placeholder="Password"
              value={isPassWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <button
              className="h-10  w-full rounded bg-[#01DEA4] text-[#fff] duration-100 hover:border-2 hover:border-black hover:bg-white hover:text-[#000]"
              type="button"
              onClick={() => LoginOnClick(isName, isPassWord)}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
