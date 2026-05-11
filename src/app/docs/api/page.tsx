import Link from 'next/link';

export const metadata = {
  title: 'API Documentation | Kiran Slido Craft',
  description: 'Public API and agent discovery documentation for Kiran Slido Craft.',
};

export default function ApiDocsPage() {
  return (
    <div className="bg-white py-24">
      <div className="max-container max-w-4xl px-6">
        <p className="text-eyebrow">Agent Discovery</p>
        <h1 className="heading-page text-slate-950">Public API Documentation</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Kiran Slido Craft exposes public discovery endpoints for automated agents to find product catalog
          summaries, OpenAPI metadata, health status, and machine-readable site capabilities.
        </p>

        <div className="mt-12 grid gap-4">
          {[
            ['API catalog', '/.well-known/api-catalog', 'application/linkset+json discovery document.'],
            ['OpenAPI description', '/openapi.json', 'OpenAPI 3.1 description for public endpoints.'],
            ['LLM catalog', '/llms.txt', 'Plain text product and company catalog for agents.'],
            ['Health', '/api/health', 'JSON health check for public API availability.'],
            ['Agent skills', '/.well-known/agent-skills/index.json', 'Agent skill discovery index.'],
          ].map(([label, href, description]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <span className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">{label}</span>
              <span className="mt-2 block break-all text-sm font-semibold text-slate-950">{href}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-600">{description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
