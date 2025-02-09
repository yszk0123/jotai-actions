import { atom, createStore } from 'jotai/vanilla';
import { expect, test } from 'vitest';
import { createWrite } from './createWrite';

test('should call setter without payload', () => {
  const store = createStore();
  const stateAtom = atom(10);
  const resetAtom = atom(
    (get) => get(stateAtom),
    createWrite({
      reset: (_get, set) => {
        set(stateAtom, 0);
      },
    }),
  );
  expect(store.get(resetAtom)).toBe(10);

  store.set(resetAtom, 'reset');

  expect(store.get(resetAtom)).toBe(0);
});

test('should call setter with payload', () => {
  const store = createStore();
  const stateAtom = atom(0);
  const countAtom = atom(
    (get) => get(stateAtom),
    createWrite({
      increment: (_get, set, delta: number) => {
        set(stateAtom, (v) => v + delta);
      },
    }),
  );
  expect(store.get(countAtom)).toBe(0);

  store.set(countAtom, 'increment', 3);

  expect(store.get(countAtom)).toBe(3);
});

test('should call setter with other atoms', () => {
  const store = createStore();
  const stateAtom = atom('initial text');
  const draftStateAtom = atom('edited text');
  const editAtom = atom(
    (get) => get(stateAtom),
    createWrite({
      save: (get, set) => {
        set(stateAtom, get(draftStateAtom));
      },
    }),
  );
  expect(store.get(editAtom)).toBe('initial text');

  store.set(editAtom, 'save');

  expect(store.get(editAtom)).toBe('edited text');
});
