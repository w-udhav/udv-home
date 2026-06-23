"use client";

import { useEffect, useState } from "react";
import ButtonGroup from "@/components/ui/button-group";
import ElsewhereSection from "@/components/ui/elsewhere-section";
import SectionView from "@/components/ui/section-view";
import ShowcaseGrid from "@/components/ui/showcase-grid";
import ThinkingSection from "@/components/ui/thinking-section";
import { showcaseTiles } from "@/utils/showcase-tiles";

const greetings = ["Hello", "Hola", "नमस्ते", "你好", "Bonjour"];

export default function Home() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* Hero */}
      <SectionView className="flex flex-col gap-10 py-24">
        {/* Greeting - name */}
        <div className="flex flex-col gap-2 text-5xl font-serif">
          <h1>{greetings[greetingIndex]}</h1>
          <h1>i'm</h1>
          <h1>udhav .</h1>
        </div>
        <div className="grid grid-cols-6">
          <h3 className="col-span-4 font-serif text-xl text-zinc-200">
            i design and build thoughtful digital experiences. this space is a
            clean starting point for projects, writing, and contact details.
          </h3>
        </div>

        {/* Dimension of me */}
        <ButtonGroup
          size="small"
          items={[
            { id: "1", label: "Work", onClick: () => {} },
            { id: "2", label: "Thinking", onClick: () => {} },
            { id: "3", label: "Elsewhere", onClick: () => {} },
          ]}
        />
      </SectionView>

      <SectionView id="work" fullView>
        <ShowcaseGrid tiles={showcaseTiles} />
      </SectionView>

      <ThinkingSection />

      <ElsewhereSection />
    </main>
  );
}
