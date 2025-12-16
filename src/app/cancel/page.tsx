export default function CancelPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Payment Cancelled</h1>
      <p>No worries. You can upgrade anytime.</p>
      <a href="/pricing">
        <button style={{ marginTop: 20 }}>Back to Pricing</button>
      </a>
    </div>
  );
}
