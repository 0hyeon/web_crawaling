import useMutation from "@libs/client/useMutation";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import { withSsrSession } from "@libs/server/withSession";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MutationResult } from "types/type";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from "atoms";
const Login = () => {
  
  const router = useRouter()
  const [isName, setName] = useState<string | undefined>();
  const [isPassWord, setPassWord] = useState<string | undefined>();
  const [isLoading,setLoading] = useState<boolean>();
  
  const setLoginState = useSetRecoilState(loginState);
  const [isLogin, setLogin] = useRecoilState(loginState);

  const [enter, { loading, data, error }] = useMutation<MutationResult>(`${FEcheckEnvironment().concat("/api/users/sign-up")}`);

    
  const LoginOnClick = (name: string|undefined , pw: string|undefined ,e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    enter({ name, pw });
  };
  useEffect(()=>{
    if(data?.ok){

      const profileString = data?.profile;

      setLoginState(()=>{ 
        return {
          ...profileString
        }
        
        
      })
      alert("로그인성공");
      router.push('/pcbanner')
      return
    }
    if(data?.errors?.message){
      alert(data?.errors?.message)
    }
  },[data,router,setLoginState])
  
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
            <div>Web Funtion</div>
          </h2>
          <form onSubmit={(e) => LoginOnClick(isName, isPassWord,e)}>
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
              className={`h-10 w-full rounded ${data?.ok || loading ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-[#01DEA4] text-[#fff] hover:bg-white hover:text-[#000] hover:border-2 hover:border-black duration-100'}`}
              type="submit"
              disabled={data?.ok || loading}
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
