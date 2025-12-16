export default function SuccessPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🎉 Payment Successful</h1>
      <p>Your plan has been activated.</p>
      <a href="/dashboard">
        <button style={{ marginTop: 20 }}>Go to Dashboard</button>
      </a>
    </div>
  );
}
