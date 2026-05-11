import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { agentSkillMarkdown, SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  const digest = createHash('sha256').update(agentSkillMarkdown).digest('hex');

  return NextResponse.json({
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'ksco-catalog',
        type: 'skill-md',
        description: 'Discover Kiran Slido Craft products, categories, contact routes, and public API metadata.',
        url: `${SITE_URL}/.well-known/agent-skills/ksco-catalog/SKILL.md`,
        digest: `sha256:${digest}`,
      },
    ],
  });
}
