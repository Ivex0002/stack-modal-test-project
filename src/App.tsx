import { TwFmExample } from "./examples/custom/TwFmExample";
import { PresetExample } from "./examples/preset/presetExample";

export function App() {
  return (
    <>
      <h1>custom : tailwind + framer motion</h1>
      <TwFmExample />
      <hr />
      <h1>preset : try 3 cases(drawer, minimal, default)</h1>
      <PresetExample />
      <hr />
    </>
  );
}

// npm i ../../modal-stack/packages/core/modal-stack-1.0.0.tgz
// npm i ../../modal-stack/packages/presets/modal-stack-presets-1.0.0.tgz
