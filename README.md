# jotai-actions

> [!WARNING]
> This library is still in the early stages of development and may be subject to breaking changes.

`jotai-actions` is a utility library for managing state actions in [Jotai](https://github.com/pmndrs/jotai). It provides a simple and flexible way to define and handle actions that modify the state of atoms.

## Installation

You can install `jotai-actions` using npm or yarn:

```sh
npm install jotai-actions
# or
yarn add jotai-actions
```

## Usage

Here's a basic example of how to use `jotai-actions`:

```typescript
import { atom, useAtom } from 'jotai';
import { createWrite } from 'jotai-actions';

const stateAtom = atom(0);
const countAtom = atom(
  (get) => get(stateAtom),
  createWrite({
    increment: (_get, set, delta: number) => {
      set(stateAtom, (v) => v + delta);
    },
    reset: (_get, set) => {
      set(stateAtom, 0);
    },
  })
);

function Counter(): JSX.Element {
  const [count, dispatch] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('increment', 1)}>Increment</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>
  );
}
```

## API

### `createWrite(actions: Record<string, (get: Getter, set: Setter, ...args: any[]) => void>): Setter`

Creates a setter function for the given actions.

#### Parameters

- `actions`: An object where keys are action names and values are functions that define the action logic.

#### Returns

A setter function that can be used in an atom.

## License

This project is licensed under the MIT License.
