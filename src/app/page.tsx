"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import SectionView from "@/components/ui/section-view";

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
      <SectionView className="flex flex-col gap-12 py-24">
        {/* Greeting - name */}
        <div className="flex flex-col gap-2 text-5xl font-serif">
          <h1>{greetings[greetingIndex]}</h1>
          <h1>i'm</h1>
          <h1>Udhav Wadhawan .</h1>
        </div>
        <div className="grid grid-cols-6">
          <h3 className="col-span-4 font-serif text-2xl text-zinc-200">
            I design and build thoughtful digital experiences. This space is a
            clean starting point for projects, writing, and contact details.
          </h3>
        </div>
        {/* Know more */}
        <div>
          <Button variant="outlined">Say hi</Button>
        </div>
      </SectionView>
    </main>
  );
}
