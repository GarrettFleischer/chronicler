
export const mapx = <T>(func: () => T, x: number): T[] =>  [...Array<T>(x)].map(func)