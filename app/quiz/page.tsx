"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, Style } from "@/lib/products";

interface Question {
  id: string;
  question: string;
  options: { label: string; emoji: string; styles: Style[] }[];
}

const questions: Question[] = [
  {
    id: "vibe",
    question: "What's your overall vibe?",
    options: [
      { label: "Chill & relaxed", emoji: "😎", styles: ["streetwear", "minimalist"] },
      { label: "Soft & dreamy", emoji: "🌸", styles: ["cottagecore", "y2k"] },
      { label: "Classic & clean", emoji: "✨", styles: ["preppy", "minimalist"] },
      { label: "Bold & edgy", emoji: "🖤", styles: ["grunge", "streetwear"] },
    ],
  },
  {
    id: "weekend",
    question: "What are you doing this weekend?",
    options: [
      { label: "Hanging with friends downtown", emoji: "🏙️", styles: ["streetwear", "y2k"] },
      { label: "Picnic in the park", emoji: "🌿", styles: ["cottagecore", "minimalist"] },
      { label: "Shopping at the mall", emoji: "🛍️", styles: ["preppy", "y2k"] },
      { label: "Concert or show", emoji: "🎵", styles: ["grunge", "streetwear"] },
    ],
  },
  {
    id: "icon",
    question: "Which style icon speaks to you most?",
    options: [
      { label: "Pharrell / Travis Scott", emoji: "🧢", styles: ["streetwear"] },
      { label: "Early 2000s pop star", emoji: "💿", styles: ["y2k"] },
      { label: "Clean girl aesthetic", emoji: "🤍", styles: ["minimalist", "preppy"] },
      { label: "Indie folk artist", emoji: "🌾", styles: ["cottagecore", "grunge"] },
    ],
  },
  {
    id: "item",
    question: "Pick the item you'd wear first:",
    options: [
      { label: "Cargo pants + sneakers", emoji: "👟", styles: ["streetwear"] },
      { label: "Low rise jeans + crop top", emoji: "💖", styles: ["y2k"] },
      { label: "Linen wide legs + white tee", emoji: "🌿", styles: ["minimalist", "cottagecore"] },
      { label: "Mini skirt + boots", emoji: "🥾", styles: ["grunge", "preppy"] },
    ],
  },
  {
    id: "color",
    question: "Your go-to color palette:",
    options: [
      { label: "Neutrals & earth tones", emoji: "🤎", styles: ["minimalist", "cottagecore"] },
      { label: "Black & white", emoji: "⚫", styles: ["grunge", "minimalist"] },
      { label: "Pastels & soft pink", emoji: "🩷", styles: ["y2k", "cottagecore"] },
      { label: "Bold brights & pattern", emoji: "🌈", styles: ["streetwear", "preppy"] },
    ],
  },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Style[][]>([]);
  const [done, setDone] = useState(false);

  function handleAnswer(styles: Style[]) {
    const newAnswers = [...answers, styles];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setDone(true);
    }
  }

  function getTopStyles(): Style[] {
    const counts: Record<string, number> = {};
    answers.flat().forEach((s) => {
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([style]) => style as Style);
  }

  function restart() {
    setCurrentQ(0);
    setAnswers([]);
    setDone(false);
  }

  if (done) {
    const topStyles = getTopStyles();
    const recommended = products
      .filter((p) => p.styles.some((s) => topStyles.includes(s)))
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const styleLabels: Record<Style, string> = {
      streetwear: "Streetwear",
      y2k: "Y2K",
      minimalist: "Minimalist",
      cottagecore: "Cottagecore",
      preppy: "Preppy",
      grunge: "Grunge",
    };

    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Your style results are in!
          </div>
          <h1 className="text-5xl font-black mb-4">
            You&apos;re{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {topStyles.map((s) => styleLabels[s]).join(" × ")}
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Here are the pieces we curated just for your aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={restart}
            className="border border-gray-200 px-8 py-3 rounded-full font-semibold hover:border-black transition-colors"
          >
            Retake Quiz
          </button>
          {topStyles.map((style) => (
            <Link
              key={style}
              href={`/shop?style=${style}`}
              className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-500 transition-colors"
            >
              Shop All {styleLabels[style]}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-10">{question.question}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleAnswer(option.styles)}
              className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition-all text-left"
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="font-semibold group-hover:text-pink-600 transition-colors">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
