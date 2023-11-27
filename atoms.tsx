import { atomFamily, atom, selector,RecoilEnv } from "recoil";
import { IToDoState } from "types/type";
import {recoilPersist} from 'recoil-persist'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
export const toDoState = atomFamily<IToDoState, string>({
  key: "todos",
  default: {
    "가능 로직": [
      "특정카테고리추출",
      "다중중복제거",
      "PROD(adid3회이상제거)",
      "하나로취합",
    ],
    선택: [],
  },
});

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

const {persistAtom} = recoilPersist({
  key: "loginPersist",
  storage: sessionStorage
});

// recoil-persist 적용
export const loginState = atom({
  key: "login",
  default: {},
  effects_UNSTABLE: [persistAtom]
});