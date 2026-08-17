import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const posts = [
  {
    slug: "why-streetwear-is-more-than-fashion",
    category: "Culture",
    title: "Why Streetwear Is More Than Fashion",
    excerpt:
      "Streetwear has evolved from a subculture into a language of identity, creativity and self-expression.",
    date: "August 17, 2026",
    readTime: "5 min read",
    image: "/images/blog/streetwear.jpg",
  },
  {
    slug: "building-your-everyday-rotation",
    category: "Style",
    title: "Building Your Everyday Rotation",
    excerpt:
      "A practical approach to creating a wardrobe that works across everyday moments without losing your identity.",
    date: "August 17, 2026",
    readTime: "4 min read",
    image: "/images/blog/rotation.jpg",
  },
  {
    slug: "the-gculture-approach",
    category: "G-Culture",
    title: "The G-Culture Approach",
    excerpt:
      "Design, culture and confidence come together to create pieces made for people who want to stand apart.",
    date: "August 17, 2026",
    readTime: "4 min read",
    image: "/images/blog/gculture.jpg",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-white">

      {/* HERO */}

      <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1280px]">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-white/30" />

            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              G-Culture Journal
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>
              <h1 className="max-w-3xl text-5xl font-normal tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Stories behind
                <br />
                <span className="text-white/35">
                  the culture.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
                Style, culture, creativity and the ideas
                shaping G-Culture.
              </p>
            </div>

            <Link
              to="/latest-drops"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white/60 transition hover:border-white/30 hover:bg-white hover:text-black"
            >
              Explore Latest Drops
              <ArrowRight size={14} />
            </Link>

          </div>

        </div>

      </section>


      {/* POSTS */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12">

        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group"
            >

              <article>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]">

                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                    {post.category}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                  </span>

                </div>

                <div className="pt-5">

                  <div className="flex items-center gap-3 text-[10px] text-white/25">
                    <span>{post.date}</span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-medium tracking-[-0.025em] text-white/85 transition group-hover:text-white">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/35">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/45 transition group-hover:text-white">
                    Read Article
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>

                </div>

              </article>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}