import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
} from "lucide-react";

const posts = {
  "why-streetwear-is-more-than-fashion": {
    category: "Culture",
    title: "Why Streetwear Is More Than Fashion",
    date: "August 17, 2026",
    readTime: "5 min read",

    intro:
      "Streetwear has always been about more than the clothes themselves. It is a visual language shaped by music, art, communities and individual identity.",

    sections: [
      {
        heading: "Clothing becomes identity",
        text:
          "What we wear communicates something before we say a word. Streetwear gives people the freedom to combine influences, experiment with silhouettes and create a style that feels personal.",
      },
      {
        heading: "Culture shapes the clothes",
        text:
          "The strongest fashion movements rarely exist in isolation. Music, design, sport, technology and local communities all influence the way people dress and the way brands create.",
      },
      {
        heading: "Why G-Culture exists",
        text:
          "G-Culture was created around the idea that clothing should feel like an extension of the person wearing it. Our goal is to create pieces that balance contemporary design with confidence and culture.",
      },
      {
        heading: "Wear it your way",
        text:
          "There is no single formula for personal style. The best wardrobe is one that gives you room to experiment, combine pieces and build a look that feels unmistakably yours.",
      },
    ],
  },

  "building-your-everyday-rotation": {
    category: "Style",
    title: "Building Your Everyday Rotation",
    date: "August 17, 2026",
    readTime: "4 min read",

    intro:
      "A strong everyday wardrobe does not need hundreds of pieces. It needs a small collection that works together and reflects your style.",

    sections: [
      {
        heading: "Start with versatile pieces",
        text:
          "Build around pieces that can work across multiple outfits. Neutral shirts, relaxed trousers, versatile outerwear and everyday accessories create a strong foundation.",
      },
      {
        heading: "Add your statement pieces",
        text:
          "Once the foundation is established, introduce pieces that express your personality. Graphics, colour, unusual silhouettes and accessories can completely change an outfit.",
      },
      {
        heading: "Think in combinations",
        text:
          "Instead of buying individual outfits, think about how every new piece works with what you already own. This makes your wardrobe more useful and more personal.",
      },
    ],
  },

  "the-gculture-approach": {
    category: "G-Culture",
    title: "The G-Culture Approach",
    date: "August 17, 2026",
    readTime: "4 min read",

    intro:
      "G-Culture is built around a simple idea: clothing should help people express who they are rather than simply follow what everyone else is wearing.",

    sections: [
      {
        heading: "Design with intention",
        text:
          "Every product starts with the balance between visual impact and everyday wearability. We want pieces that look distinctive while still becoming part of your rotation.",
      },
      {
        heading: "Culture matters",
        text:
          "Our visual language draws from contemporary Indian culture, global streetwear and the creative communities that continue to redefine fashion.",
      },
      {
        heading: "Confidence is the final layer",
        text:
          "A great piece only becomes yours when you make it yours. G-Culture is about giving you the canvas to experiment, combine and create.",
      },
    ],
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = posts[slug];

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050507] px-6 text-white">
        <div className="text-center">

          <h1 className="text-4xl">
            Article not found
          </h1>

          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Journal
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050507] text-white">

      {/* HEADER */}

      <section className="px-5 pb-14 pt-28 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-4xl">

          <Link
            to="/blog"
            className="mb-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/35 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to Journal
          </Link>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-7 text-4xl font-normal tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/45">
            {post.intro}
          </p>

        </div>

      </section>


      {/* ARTICLE */}

      <article className="px-5 pb-24 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-3xl">

          <div className="mb-14 h-px bg-white/[0.08]" />

          {post.sections.map((section) => (
            <section
              key={section.heading}
              className="mb-12"
            >

              <h2 className="text-2xl font-medium tracking-[-0.025em]">
                {section.heading}
              </h2>

              <p className="mt-5 text-base leading-8 text-white/45">
                {section.text}
              </p>

            </section>
          ))}

          <div className="mt-16 border-t border-white/[0.08] pt-10">

            <Link
              to="/latest-drops"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/90"
            >
              Explore Latest Drops
            </Link>

          </div>

        </div>

      </article>

    </main>
  );
}