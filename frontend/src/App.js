import { useEffect, useMemo, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [status, setStatus] = useState({ type: "", msg: "" }); // success | error

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Phone is required";
    return e;
  }, [name, email, phone]);

  const isValid = Object.keys(errors).length === 0;

  const loadContacts = () => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Auto-clear status after 3 seconds
  useEffect(() => {
    if (!status.msg) return;
    const t = setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, phone: true });
    if (!isValid) return;

    setStatus({ type: "", msg: "" });

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setTouched({ name: false, email: false, phone: false });
      setStatus({ type: "success", msg: "Contact added successfully!" });
      loadContacts();
    } else {
      const errData = await res.json();
      setStatus({
        type: "error",
        msg: errData.message || "Something went wrong",
      });
    }
  };

  const statusStyle =
    status.type === "success"
      ? { borderColor: "#16a34a", background: "#ecfdf5", color: "#065f46" }
      : status.type === "error"
      ? { borderColor: "#dc2626", background: "#fef2f2", color: "#7f1d1d" }
      : {};

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Contact Management</h1>
          </div>
          <button
            style={styles.secondaryBtn}
            onClick={() => {
              loadContacts();
              setStatus({ type: "success", msg: "Contacts refreshed!" });
            }}
          >
            Refresh
          </button>
        </header>

        <div className="__gridHack" style={styles.grid}>
          {/* Form Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Add Contact</h2>

            {status.msg ? (
              <div style={{ ...styles.alert, ...statusStyle }}>{status.msg}</div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <Field
                label="Name *"
                value={name}
                onChange={(v) => setName(v)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Your_Name"
                error={touched.name ? errors.name : ""}
              />

              <Field
                label="Email *"
                value={email}
                onChange={(v) => setEmail(v)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="Your_id@example.com"
                error={touched.email ? errors.email : ""}
              />

              <Field
                label="Phone *"
                value={phone}
                onChange={(v) => setPhone(v)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="9999999999"
                error={touched.phone ? errors.phone : ""}
              />

              <button
                type="submit"
                disabled={!isValid}
                style={{
                  ...styles.primaryBtn,
                  ...(isValid ? {} : styles.btnDisabled),
                }}
              >
                Add Contact
              </button>
            </form>
          </div>

          {/* Contacts Card */}
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <h2 style={styles.cardTitle}>Contacts</h2>
              <span style={styles.badge}>{contacts.length} total</span>
            </div>

            {contacts.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyTitle}>No contacts yet</div>
                <div style={styles.emptyText}>
                  Add one using the form on the left.
                </div>
              </div>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Phone</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c._id}>
                        <td style={styles.tdStrong}>{c.name}</td>
                        <td style={styles.td}>{c.email}</td>
                        <td style={styles.td}>{c.phone}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.dangerBtn}
                            onClick={async () => {
                              const res = await fetch(`/api/contacts/${c._id}`, {
                                method: "DELETE",
                              });

                              if (res.ok) {
                                setStatus({
                                  type: "success",
                                  msg: "Contact deleted successfully!",
                                });
                                loadContacts();
                              } else {
                                setStatus({ type: "error", msg: "Failed to delete" });
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, onBlur, placeholder, error }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
      />
      {error ? <div style={styles.errorText}>{error}</div> : null}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    padding: 18,
  },
  container: { maxWidth: 1100, margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 16,
  },
  title: { margin: 0, fontSize: 28, letterSpacing: -0.4 },
  subtitle: { margin: "6px 0 0", color: "#475569" },

  grid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "1fr",
    alignItems: "start",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
  },
  cardTitle: { margin: 0, marginBottom: 12, fontSize: 18 },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  badge: {
    fontSize: 12,
    background: "#eef2ff",
    color: "#3730a3",
    border: "1px solid #c7d2fe",
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 600,
  },

  alert: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    border: "1px solid",
    fontSize: 14,
  },

  field: { marginBottom: 12 },
  label: { display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 },
  input: {
    width: "90%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: 14,
  },
  inputError: { borderColor: "#dc2626" },
  errorText: { marginTop: 6, color: "#dc2626", fontSize: 12 },

  primaryBtn: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #0f172a",
    background: "#0f172a",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed" },

  dangerBtn: {
    padding: "7px 10px",
    borderRadius: 10,
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#b91c1c",
    fontWeight: 700,
    cursor: "pointer",
  },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 12,
    color: "#475569",
    padding: "10px 8px",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px 8px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 13,
    color: "#0f172a",
  },
  tdStrong: {
    padding: "12px 8px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 13,
    color: "#0f172a",
    fontWeight: 800,
  },

  empty: {
    border: "1px dashed #cbd5e1",
    borderRadius: 12,
    padding: 18,
    background: "#f8fafc",
  },
  emptyTitle: { fontWeight: 800, marginBottom: 6 },
  emptyText: { color: "#475569", fontSize: 13 },

  footer: { marginTop: 14, color: "#64748b", fontSize: 12 },
};

// Simple responsive: 2 columns on wider screens
if (typeof window !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    @media (min-width: 900px) {
      .__gridHack { grid-template-columns: 1fr 1.4fr !important; }
    }
  `;
  document.head.appendChild(styleTag);
}
export default App;
