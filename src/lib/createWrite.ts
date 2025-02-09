import type { Getter, Setter } from 'jotai/vanilla';

type OmitGetterAndSetter<T extends unknown[]> = T extends [unknown, unknown, ...infer U] ? U : [];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type BaseActions = Record<string, (get: Getter, set: Setter, ...payload: any[]) => unknown>;

type ActionKeyAndParams<Actions extends BaseActions> = {
  [K in keyof Actions]: [K, ...OmitGetterAndSetter<Parameters<Actions[K]>>];
}[keyof Actions];

type Write<Actions extends BaseActions> = <K extends keyof Actions>(
  get: Getter,
  set: Setter,
  ...actionKeyAndParams: ActionKeyAndParams<Actions>
) => ReturnType<Actions[K]>;

export function createWrite<Actions extends BaseActions>(actions: Actions): Write<Actions> {
  const write: Write<Actions> = <Key extends keyof Actions>(
    get: Getter,
    set: Setter,
    key: Key,
    ...args: unknown[]
  ): ReturnType<Actions[Key]> => {
    return actions[key]?.(get, set, ...args) as ReturnType<Actions[Key]>;
  };
  return write;
}
