export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">
          ARKEES AI for Enterprises
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Secure, scalable AI workflows for teams that demand reliability,
          control, and performance at scale.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800"
          >
            Talk to Enterprise Sales
          </a>
          <a
            href="/upgrade"
            className="px-6 py-3 border border-gray-300 rounded-lg text-lg hover:bg-gray-50"
          >
            View Plans
          </a>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {[
          {
            title: "Shared Credits",
            desc: "One centralized credit pool usable across your entire organization.",
          },
          {
            title: "Team Control",
            desc: "Role-based access, admin governance, and usage visibility.",
          },
          {
            title: "Automation Ready",
            desc: "Dashboards, PDFs, reports, and workflow automation at scale.",
          },
          {
            title: "Enterprise Support",
            desc: "Priority processing, dedicated support, and GST invoices.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Who it’s for */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <h2 className="text-3xl font-bold mb-6">
          Trusted by teams across industries
        </h2>
        <p className="text-gray-600 mb-10">
          Startups · Agencies · Research Teams · Consulting Firms · Internal Ops
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            "Internal dashboards & analytics",
            "Automated document & report generation",
            "Business intelligence summaries",
            "Workflow & operations automation",
            "Content & research teams",
            "High-volume data processing",
          ].map((use) => (
            <div
              key={use}
              className="p-5 rounded-lg bg-gray-50 border border-gray-200"
            >
              {use}
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What your organization gets
        </h2>
        <ul className="space-y-4 text-lg text-gray-700">
          <li>✔ 10,000+ scalable monthly credits</li>
          <li>✔ 5–50+ users with shared access</li>
          <li>✔ Usage tracking per user & team</li>
          <li>✔ Priority processing queue</li>
          <li>✔ Custom integrations on request</li>
          <li>✔ India-ready GST billing</li>
        </ul>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="max-w-5xl mx-auto text-center bg-gray-50 rounded-2xl p-12"
      >
        <h2 className="text-4xl font-bold mb-4">
          Let’s talk before you buy
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          We’ll understand your use case and recommend a tailored enterprise
          setup for your team.
        </p>

        <button className="px-8 py-4 bg-black text-white rounded-xl text-lg hover:bg-gray-800">
          Contact Enterprise Sales
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Our team usually responds within 24 hours.
        </p>
      </section>
    </div>
  );
}
