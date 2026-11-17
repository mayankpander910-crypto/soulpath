'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_FALLBACK } from '@/lib/config';
import { AI_PROMPT, AI_ASSISTANTS } from '@/lib/content';
import { Sparkle, Whatsapp } from './Icons';

/**
 * Floating actions kept from the original build, restyled to the new system:
 * a round "ask an AI travel assistant" button and the WhatsApp chat button.
 * Both are compact circles so they never cover page CTAs.
 */
export default function FloatingActions({ whatsapp }) {
  const pathname = usePathname();
  const number = String(whatsapp || CONTACT_FALLBACK.whatsapp).replace(/\D/g, '');
  // keep the FABs out of the way on auth screens / dashboards
  const hidden = ['/login', '/register', '/forgot-password', '/dashboard'].includes(pathname);
  if (hidden) return null;

  const assistant = AI_ASSISTANTS[0] || { name: 'ChatGPT', href: 'https://chat.openai.com/' };
  const aiHref = `${assistant.href}${assistant.href.includes('?') ? '&' : '?'}q=${encodeURIComponent(AI_PROMPT)}`;

  return (
    <div className="floating-actions">
      <a
        href={aiHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab--ai"
        aria-label="Ask an AI travel assistant about SoulPath Holiday"
        title="Ask an AI travel assistant"
      >
        <Sparkle size={20} />
      </a>
      <a
        href={`https://wa.me/${number}?text=${encodeURIComponent(
          'Hi SoulPath Holiday, I would like help planning a trip.'
        )}`}
        className="fab fab--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SoulPath Holiday on WhatsApp"
      >
        <Whatsapp size={24} />
      </a>
      <Link href="/request-proposal" className="sr-only">
        Plan your trip
      </Link>
    </div>
  );
}
