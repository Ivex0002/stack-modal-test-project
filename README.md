# @ivex0002/stack-modal : test project

A flexible and customizable modal stack management library for React applications. Modal Stack allows you to create layered modals with smooth animations and various preset styles.

## Preview

### default preset

![Honeycam 2025-12-28 13-23-52](https://github.com/user-attachments/assets/e1cf2c64-10c3-4d50-bebf-771bf6154ad1)

### custom layout style (tailwind, framer-motion)

![Honeycam 2025-12-28 13-24-38](https://github.com/user-attachments/assets/b7573c8b-2ea5-41a4-8ad5-4bf2dd697ca5)

### npm link

https://www.npmjs.com/package/@ivex0002/stack-modal

### git link

https://github.com/Ivex0002/stack-modal

## Features

- 🎨 **Multiple Presets**: Default, Minimal, and Drawer layouts
- 📚 **Modal Stacking**: Support for multiple modals with depth management
- ⌨️ **Keyboard Support**: ESC key to close modals
- 🎭 **Custom Layouts**: Create your own modal layouts
- 🪶 **Lightweight**: Minimal dependencies
- 💪 **TypeScript**: Full type safety
- 🔄 **React 18 Compatible**: Built with useSyncExternalStore
- 🎯 **Zero runtime dependencies** (React as peer dependency)

## Installation

### Core Package

```bash
npm install @ivex0002/stack-modal
```

### Presets (Optional)

If you want to use built-in presets:

```bash
npm install @ivex0002/stack-modal-presets
```

> **Note**: Presets are optional. If you're creating custom layouts, you don't need to install this presets package.

## Quick Start

```typescript
import { createModalStack } from "@ivex0002/stack-modal";
import { defaultPreset } from "@ivex0002/stack-modal-presets";

// Define your modals
const modals = {
  alert: ({ message }: { message: string }) => (
    <div>
      <h2>Alert</h2>
      <p>{message}</p>
    </div>
  ),
  confirm: ({ title, onConfirm }: { title: string; onConfirm: () => void }) => (
    <div>
      <h2>{title}</h2>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  ),
};

// Create modal instance with preset
const modal = createModalStack(modals, defaultPreset);

// Use in your component
function App() {
  return (
    <div>
      <button onClick={() => modal.alert.push({ message: "Hello!" })}>
        Show Alert
      </button>
      <button
        onClick={() =>
          modal.confirm.push({
            title: "Are you sure?",
            onConfirm: () => console.log("Confirmed!"),
          })
        }
      >
        Show Confirm
      </button>
    </div>
  );
}
```

## Presets

### Default Preset

A centered modal with stacking animation. Multiple modals are displayed with offset and scale effects.

```typescript
import { defaultPreset } from "@ivex0002/stack-modal-presets";

const modal = createModalStack(modals, defaultPreset);
```

### Minimal Preset

A simple centered modal with fade transitions. Only the top modal is visible.

```typescript
import { minimalPreset } from "@ivex0002/stack-modal-presets";

const modal = createModalStack(modals, minimalPreset);
```

### Drawer Preset

A bottom sheet style modal that slides up from the bottom of the screen.

```typescript
import { drawerPreset } from "@ivex0002/stack-modal-presets";

const modal = createModalStack(modals, drawerPreset);
```

## API Reference

### `createModalStack(modals, modalLayout)`

Creates a modal instance with the specified modals and layout.

**Parameters:**

- `modals`: An object where keys are modal names and values are React components
- `modalLayout`: A layout configuration object (use presets or create custom)

**Returns:**

- Modal control object with `push` methods for each modal and a `pop` method

### Modal Control Object

```typescript
const modal = createModalStack(modals, preset);

// Push a modal
modal.modalName.push(props);

// Close the top modal
modal.pop();
```

## Custom Layout

You can create your own modal layout by implementing the `ModalLayout` interface.

this example made with tailwindcss & framer-motion.

```typescript
import { motion } from "framer-motion";
import React from "react";
import type { ModalLayout } from "@ivex0002/stack-modal";

const STACK_OFFSET = 80;
const SCALE_STEP = 0.06;
const OPACITY_STEP = 0.08;

export const twfmModalLayoutExample: ModalLayout = {
  Background: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keyup", onKey);
      return () => window.removeEventListener("keyup", onKey);
    }, [onClose]);

    return (
      <motion.div
        className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-md"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </motion.div>
    );
  },

  ModalWrap: ({
    children,
    depth,
    isTop,
  }: {
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }) => {
    const x = -depth * STACK_OFFSET;
    const scale = 1 - depth * SCALE_STEP;
    const opacity = 1 - depth * OPACITY_STEP;

    return (
      <motion.div
        className="absolute w-auto max-w-[90vw] rounded-3xl bg-white p-8 ring-1 ring-black/5"
        style={{
          left: "50%",
          top: "50%",
          pointerEvents: isTop ? "auto" : "none",
          background:
            "linear-gradient(to bottom right, white, white, rgb(249, 250, 251))",
          boxShadow: isTop
            ? "0 20px 70px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,102,241,0.1)"
            : "0 10px 40px -10px rgba(0,0,0,0.2)",
        }}
        initial={{
          opacity: 0,
          scale: 0.9,
          x: "-50%",
          y: "-45%",
        }}
        animate={{
          opacity,
          scale,
          x: `calc(-50% + ${x}px)`,
          y: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          x: "-50%",
          y: "-45%",
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          mass: 0.8,
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), transparent, rgba(168, 85, 247, 0.05))",
          }}
        />
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), transparent)",
          }}
        />

        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  },
};

const modal = createModalStack(modals, twfmModalLayoutExample);
```

### ModalLayout Interface

```typescript
type ModalLayout = {
  Background: React.ComponentType<{
    children: React.ReactNode;
    onClose: () => void;
  }>;
  ModalWrap: React.ComponentType<{
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }>;
};
```

- **Background**: The backdrop and container for all modals

  - `onClose`: Function to close the top modal
  - `children`: The modal content

- **ModalWrap**: Wrapper for each individual modal
  - `depth`: The position in the stack (0 = top, 1 = second from top, etc.)
  - `isTop`: Boolean indicating if this is the topmost modal
  - `children`: The modal content

## Examples

### Alert Modal

```typescript
const modals = {
  alert: ({ message }: { message: string }) => (
    <div style={{ padding: "20px" }}>
      <h2>Alert</h2>
      <p>{message}</p>
      <button onClick={() => modal.pop()}>OK</button>
    </div>
  ),
};

// Usage
modal.alert.push({ message: "Something happened!" });
```

### Confirmation Modal

```typescript
const modals = {
  confirm: ({
    title,
    message,
    onConfirm,
  }: {
    title: string;
    message: string;
    onConfirm: () => void;
  }) => (
    <div style={{ padding: "20px" }}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            onConfirm();
            modal.pop();
          }}
        >
          Confirm
        </button>
        <button onClick={() => modal.pop()}>Cancel</button>
      </div>
    </div>
  ),
};

// Usage
modal.confirm.push({
  title: "Delete Item",
  message: "Are you sure you want to delete this item?",
  onConfirm: () => console.log("Item deleted"),
});
```

### Stacked Modals

```typescript
// Open multiple modals
modal.first.push({ data: "First modal" });
modal.second.push({ data: "Second modal" });
modal.third.push({ data: "Third modal" });

// Close them one by one
modal.pop(); // Closes third
modal.pop(); // Closes second
modal.pop(); // Closes first
```

## TypeScript Support

Modal Stack is written in TypeScript and provides full type safety:

```typescript
// Props are fully typed
const modals = {
  user: ({ name, age }: { name: string; age: number }) => (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  ),
};

const modal = createModalStack(modals, defaultPreset);

// ✅ Correct
modal.user.push({ name: "John", age: 30 });

// ❌ TypeScript error
modal.user.push({ name: "John" }); // Missing 'age'
modal.user.push({ name: "John", age: "30" }); // Wrong type
```

## How It Works

Modal Stack uses a simple but powerful architecture to manage modal states and rendering.

### Core Components

#### 1. Stack Store

The store manages the modal stack state using a simple array:

```typescript
type StackItem = {
  key: string;
  props: unknown;
};

export const createStackStore = () => {
  let stack: StackItem[] = [];
  const listeners = new Set<() => void>();
  return {
    push(item: StackItem) {
      stack = [...stack, item];
      listeners.forEach((l) => l());
    },
    pop() {
      stack = stack.slice(0, -1);
      listeners.forEach((l) => l());
    },
    get() {
      return stack;
    },
    subscribe(fn: () => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
};
```

#### 2. Modal Renderer

The `ModalRender` component subscribes to the store and renders the modal stack:

```typescript
type ModalRegistry = {
  [key: string]: (props?: unknown) => React.ReactNode;
};
type ModalLayout = {
  Background: React.ComponentType<{
    children: React.ReactNode;
    onClose: () => void;
  }>;
  ModalWrap: React.ComponentType<{
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }>;
};

function ModalRender<M extends ModalRegistry>({
  modals,
  modalLayout,
  store,
}: {
  modals: M;
  modalLayout: ModalLayout;
  store: StackStore;
}) {
  // Subscribe to store changes using React 18's useSyncExternalStore
  const stack = React.useSyncExternalStore(
    store.subscribe, // Subscribe function
    store.get, // Get snapshot (client)
    store.get // Get snapshot (server)
  );

  if (stack.length === 0) return null;

  return (
    <modalLayout.Background onClose={() => store.pop()}>
      {stack.map((item, index) => {
        // Calculate depth: top modal = 0, second = 1, etc.
        const depth = stack.length - 1 - index;

        return (
          <modalLayout.ModalWrap
            depth={depth}
            isTop={index === stack.length - 1}
            key={index}
          >
            {/* Dynamically render the modal component */}
            {modals[item.key](item.props)}
          </modalLayout.ModalWrap>
        );
      })}
    </modalLayout.Background>
  );
}
```

**Key features:**

- Uses `useSyncExternalStore` for optimal performance and React 18 compatibility
- Calculates `depth` for each modal (0 = top, higher = deeper in stack)
- Identifies the `isTop` modal for interaction control
- Dynamically renders modal components based on the stack state

#### 3. Modal Creation Flow

```typescript
// 1. Define modals
const modals = {
  alert: (props) => <AlertComponent {...props} />,
  confirm: (props) => <ConfirmComponent {...props} />,
};

// 2. Create modal instance
const modal = createModalStack(modals, preset);

// This creates:
// - A store to manage modal stack
// - A root DOM element to render modals
// - Push methods for each modal type
// - A pop method to close modals

// 3. Use modals
modal.alert.push({ message: "Hello" });
// -> Adds { key: "alert", props: { message: "Hello" } } to stack
// -> Triggers re-render
// -> ModalRender displays the modal

modal.pop();
// -> Removes top item from stack
// -> Triggers re-render
// -> Modal disappears
```

### Rendering Process

1. **Initial State**: Stack is empty, nothing renders
2. **Push Modal**:
   - Modal data added to stack
   - Listeners notified
   - `ModalRender` re-renders with new stack
   - `Background` and `ModalWrap` components render the modal
3. **Stack Multiple Modals**:
   - Each modal gets a `depth` value
   - Presets use `depth` to position/style modals
   - Only top modal (`isTop={true}`) receives pointer events
4. **Pop Modal**:
   - Top item removed from stack
   - Component re-renders
   - If stack is empty, returns `null`

### Why useSyncExternalStore?

`useSyncExternalStore` is a React 18 hook that safely subscribes to external stores:

- **Tearing prevention**: Ensures consistent state across concurrent renders
- **SSR support**: Separate snapshots for server and client
- **Performance**: Only re-renders when subscribed state changes

## Troubleshooting

### Modals not appearing?

Make sure `createModalStack` is called at the module level, not inside a component:

```typescript
// ✅ Correct
const modal = createModalStack(modals, preset);

function App() {
  return <button onClick={() => modal.alert.push()}>Open</button>;
}

// ❌ Wrong - creates new instance on every render
function App() {
  const modal = createModalStack(modals, preset);
  return <button onClick={() => modal.alert.push()}>Open</button>;
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
