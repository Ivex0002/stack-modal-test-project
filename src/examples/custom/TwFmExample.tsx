import { createModalStack } from "modal-stack";
import { twfmModalLayoutExample } from "./twfmModalPresetExample";

const twfmModals = {
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

const modal = createModalStack(twfmModals, twfmModalLayoutExample);

const modalKeys = Object.keys(twfmModals) as Array<keyof typeof twfmModals>;

export function TwFmExample() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
      {modalKeys.map((key) => (
        <button
          key={key}
          onClick={() => modal[key].push()}
          className="rounded-lg px-3 py-2 text-sm font-medium bg-orange-400 text-black hover:bg-orange-500 transition"
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
      className="
        w-90
        rounded-2xl
        bg-transparent
        p-8
        flex flex-col gap-4
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <CloseBtn />
      </div>

      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function CloseBtn() {
  return (
    <button
      onClick={() => modal.pop()}
      className="
        h-8 w-8
        rounded-full
        flex items-center justify-center
        text-gray-500
        hover:bg-gray-100 hover:text-gray-800
        transition
      "
      aria-label="Close modal"
    >
      ✕
    </button>
  );
}

function All() {
  return (
    <Card title="All Modals">
      <TwFmExample />
    </Card>
  );
}

function Login() {
  return (
    <Card title="Login">
      <input
        placeholder="Email"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
      <input
        placeholder="Password"
        type="password"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      <button className="mt-2 rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition">
        Login
      </button>

      <button
        onClick={() => modal.signup.push()}
        className="text-sm text-blue-600 hover:underline"
      >
        Signup
      </button>
    </Card>
  );
}
function Signup() {
  return (
    <Card title="Signup">
      <input
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        placeholder="Password"
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
        Create Account
      </button>
    </Card>
  );
}

function ConfirmDelete() {
  return (
    <Card title="ConfirmDelete">
      <p className="text-gray-700">Are you sure you want to delete it?</p>
      <button
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
        onClick={() => modal.deleteResult.push()}
      >
        Delete
      </button>
    </Card>
  );
}
function DeleteResult() {
  return (
    <Card title="DeleteResult">
      <p className="text-gray-700">Deleted</p>
    </Card>
  );
}

function ProductDetail() {
  return (
    <Card title="ProductDetail">
      <p className="text-gray-700">Stack Modal Hoodie</p>
      <button
        onClick={() => modal.cart.push()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Put in cart
      </button>
    </Card>
  );
}
function Cart() {
  return (
    <Card title="Cart">
      <p className="text-gray-700">The product is included</p>
    </Card>
  );
}

function Profile() {
  return (
    <Card title="Profile">
      <button
        onClick={() => modal.settings.push()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Settings
      </button>
    </Card>
  );
}

function Settings() {
  return (
    <Card title="Settings">
      <p className="text-gray-700">Notifications / Security / Themes</p>
    </Card>
  );
}

function Help() {
  return (
    <Card title="Help">
      <button
        onClick={() => modal.helpDetail.push()}
        className="text-blue-600 hover:text-blue-800 underline font-medium"
      >
        Learn more
      </button>
    </Card>
  );
}

function HelpDetail() {
  return (
    <Card title="HelpDetail">
      <p className="text-gray-700">
        stack-modal is a stack-based modal system.
      </p>
    </Card>
  );
}
