import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data';

export default function FaqSection() {
  return (
    <div className="mx-auto max-w-3xl py-24 px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Tire suas <span className="neon-text">Dúvidas</span>
        </h2>
        <p className="mt-4 text-zinc-400">
          Entenda mais sobre o projeto, nosso objetivo e como utilizar a plataforma.
        </p>
      </div>

      <Accordion.Root type="single" collapsible className="space-y-4">
        {faqs.map((faq) => (
          <Accordion.Item
            key={faq.id}
            value={faq.id}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="group flex flex-1 items-center justify-between p-6 text-left font-medium text-white transition-colors hover:text-violet-400">
                {faq.question}
                <ChevronDown
                  className="text-zinc-500 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  size={20}
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm text-zinc-400 data-[state=closed]:animate-[slideUp_300ms_ease-out] data-[state=open]:animate-[slideDown_300ms_ease-out]">
              <div className="p-6 pt-0">{faq.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
