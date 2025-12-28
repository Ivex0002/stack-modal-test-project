export const COLORS = {
  primary: "#2563eb",
  secondary: "#ffb351",
  danger: "#dc2626",
  neutral: "#6b7280",
  surface: "#ffffff",
  bg: "#f9fafb",
};

export const baseBtn = {
  cursor: "pointer",
  height: "2.5rem",
  padding: "0 1rem",
  borderRadius: "8px",
  border: "none",
  fontWeight: 500,
};

export const primaryBtn = {
  ...baseBtn,
  background: COLORS.primary,
  color: "#fff",
};

export const secondaryBtn = {
  ...baseBtn,
  background: COLORS.secondary,
  color: "#111",
};

export const dangerBtn = {
  ...baseBtn,
  background: COLORS.danger,
  color: "#fff",
};

export const linkBtn = {
  background: "transparent",
  color: COLORS.primary,
  border: "none",
  cursor: "pointer",
};

export const closeBtn = {
  ...baseBtn,
  width: 32,
  height: 32,
  border: "none",
  background: "transparent",
  color: "#111",
  fontSize: "1.5rem",
};

export const input = {
  width: "90%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  marginBottom: "8px",
  fontSize: "14px",
};
