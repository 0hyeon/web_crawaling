/*태그유니언*/
export type Some<A> = {
  _tag: "Some";
  value: A;
};
export type None = {
  _tag: "None";
};

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });
export const none = (): None => ({ _tag: "None" });

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";
export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";

/*유틸함수들*/
export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  if (isNone(oa)) return defaultValue;
  return oa.value;
};

export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
  if (isNone(oa)) return oa;
  return some(f(oa.value));
};

export const mapOrElse = <A, B>(
  oa: Option<A>,
  f: (a: A) => B,
  defaultValue: B
): B => {
  return getOrElse(map(oa, f), defaultValue);
};
