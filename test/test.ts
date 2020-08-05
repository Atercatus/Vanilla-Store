interface ITester {
  test(): void;
}

interface Cons {
  new (a: number, b: string): ITester;
}

class Tester implements ITester {
  constructor(a: number, b: string) {}

  test() {}
}
