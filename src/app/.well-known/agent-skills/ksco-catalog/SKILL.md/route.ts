import { NextResponse } from 'next/server';
import { agentSkillMarkdown } from '@/lib/agent-discovery';

export async function GET() {
  return new NextResponse(agentSkillMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
