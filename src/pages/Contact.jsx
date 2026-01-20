export default function Contact() {
  return (
    <div className="page" style={{ maxWidth: 640, display: "grid", gap: 12 }}>
      <h1>Contact</h1>
      <p className="lead">Static form for the demo (no backend).</p>

      <form style={{ display: "grid", gap: 12, marginTop: 10 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Name
          <input className="input" />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input className="input" type="email" />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Message
          <textarea className="textarea" rows={5} />
        </label>

        <button
          type="button"
          className="button"
          onClick={() => alert("Demo form (no backend).")}
        >
          Send
        </button>
      </form>
    </div>
  );
}