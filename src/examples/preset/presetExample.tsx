import {
  defaultPreset,
  drawerPreset,
  minimalPreset,
} from "modal-stack-presets";
import {
  closeBtn,
  dangerBtn,
  input,
  linkBtn,
  primaryBtn,
  secondaryBtn,
} from "./styles";
import { createModalStack } from "modal-stack";

const exampleModals = {
  all: () => <All />,
  login: () => <Login />,
  signup: () => <Signup />,
  confirmDelete: () => <ConfirmDelete />,
  deleteResult: () => <DeleteResult />,
  productDetail: () => <ProductDetail />,
  cart: () => <Cart />,
  profile: () => <Profile />,
  settings: () => <Settings />,
  help: () => <Help />,
  helpDetail: () => <HelpDetail />,
};

const presets = {
  default: defaultPreset,
  minimal: minimalPreset,
  drawer: drawerPreset,
};
const modal = createModalStack(exampleModals, presets.default);
// const modal = createModalStack(exampleModals, presets.minimal);
// const modal = createModalStack(exampleModals, presets.drawer);
const modalKeys = Object.keys(exampleModals) as Array<
  keyof typeof exampleModals
>;

export function PresetExample() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "12px",
      }}
    >
      {modalKeys.map((key) => (
        <button
          key={key}
          onClick={() => modal[key].push()}
          style={secondaryBtn}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="card"
      style={{
        width: 360,
        padding: "2rem",
        borderRadius: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
        <CloseBtn />
      </div>

      <div style={{ color: "#444", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function CloseBtn() {
  return (
    <button style={closeBtn} onClick={() => modal.pop()}>
      X
    </button>
  );
}
function All() {
  return (
    <Card title="All Modals">
      <PresetExample />
    </Card>
  );
}
function Login() {
  return (
    <Card title="Login">
      <input placeholder="Email" style={input} />
      <input placeholder="Password" type="password" style={input} />
      <button style={primaryBtn}>Login</button>
      <button onClick={() => modal.signup.push()} style={linkBtn}>
        Signup
      </button>
    </Card>
  );
}

function Signup() {
  return (
    <Card title="Signup">
      <input placeholder="Email" style={input} />
      <input placeholder="Password" type="password" style={input} />
      <button style={primaryBtn}>Create Account</button>
    </Card>
  );
}

function ConfirmDelete() {
  return (
    <Card title="ConfirmDelete">
      <p>Are you sure you want to delete it?</p>
      <button style={dangerBtn} onClick={() => modal.deleteResult.push()}>
        Delete
      </button>
    </Card>
  );
}

function DeleteResult() {
  return (
    <Card title="DeleteResult">
      <p>Deleted</p>
    </Card>
  );
}

function ProductDetail() {
  return (
    <Card title="ProductDetail">
      <p>Stack Modal Hoodie</p>
      <button onClick={() => modal.cart.push()} style={primaryBtn}>
        Put in cart
      </button>
    </Card>
  );
}

function Cart() {
  return (
    <Card title="Cart">
      <p>The product is included</p>
    </Card>
  );
}

function Profile() {
  return (
    <Card title="Profile">
      <button onClick={() => modal.settings.push()} style={primaryBtn}>
        Settings
      </button>
    </Card>
  );
}

function Settings() {
  return (
    <Card title="Settings">
      <p>Notifications / Security / Themes</p>
    </Card>
  );
}

function Help() {
  return (
    <Card title="Help">
      <button onClick={() => modal.helpDetail.push()} style={linkBtn}>
        Learn more
      </button>
    </Card>
  );
}

function HelpDetail() {
  return (
    <Card title="HelpDetail">
      <p>stack-modal is a stack-based modal system.</p>
    </Card>
  );
}
