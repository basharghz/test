import React from "react";
import { defineSchema } from "./schemaHelper";

type Blog = { title: string; summary: string; link: string };

type HeroWithBlogsProps = {
  headline: string;
  description: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  imageUrl?: string;
  videoLink?: string;
  blogs?: Blog[];
};

const HeroWithBlogs: React.FC<HeroWithBlogsProps> = ({
  headline,
  description,
  ctaPrimaryLabel,
  ctaPrimaryLink,
  ctaSecondaryLabel,
  ctaSecondaryLink,
  imageUrl,
  videoLink,
  blogs = []
}) => (
  <section>
    <h1>{headline}</h1>
    <p>{description}</p>
    <div>
      {ctaPrimaryLabel && ctaPrimaryLink && <a href={ctaPrimaryLink}>{ctaPrimaryLabel}</a>}
      {ctaSecondaryLabel && ctaSecondaryLink && <a href={ctaSecondaryLink}>{ctaSecondaryLabel}</a>}
    </div>
    {imageUrl && (
      <div>
        {videoLink ? (
          <a href={videoLink}><img src={imageUrl} alt="Hero" /></a>
        ) : (
          <img src={imageUrl} alt="Hero" />
        )}
      </div>
    )}
    {blogs.length > 0 && (
      <section>
        <h2>Latest Blogs</h2>
        <ul>
          {blogs.slice(0, 3).map((b, i) => (
            <li key={i}>
              <a href={b.link}>{b.title}</a>
              <p>{b.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    )}
  </section>
);

HeroWithBlogs.schema = defineSchema("HeroWithBlogs", {
  role: ["hero_section","media_block","text_block","blog_list","call_to_action"],
  props: {
    headline: { tags: ["headline","main_text"] },
    description: { tags: ["description_text","paragraph"] },
    ctaPrimaryLabel: { tags: ["call_to_action","button_text"] },
    ctaPrimaryLink: { tags: ["url","link"] },
    ctaSecondaryLabel: { tags: ["call_to_action","button_text"] },
    ctaSecondaryLink: { tags: ["url","link"] },
    imageUrl: { tags: ["image","media"] },
    videoLink: { tags: ["url","video"] },
    blogs: {
      type: "array",
      tags: ["blog_list","content_feed"],
      maxItems: 3,
      strategy: true,
      items: {
        title: { type: "string", tags: ["headline","blog_title"] },
        summary: { type: "string", tags: ["description_text","blog_summary"] },
        link: { type: "string", tags: ["url","blog_link"] }
      }
    }
  },
  examples: [
    {
      headline: "Welcome to AI World",
      description: "Automate your workflow with AI-powered tools.",
      ctaPrimaryLabel: "Get Started",
      ctaPrimaryLink: "/signup",
      ctaSecondaryLabel: "Watch Video",
      ctaSecondaryLink: "/video",
      imageUrl: "/images/hero.png",
      videoLink: "/video",
      blogs: [
        { title: "AI in 2025", summary: "Predictions for the future", link: "/blogs/ai-2025" },
        { title: "React Tips", summary: "Best practices", link: "/blogs/react-tips" },
        { title: "Next.js Tricks", summary: "Advanced techniques", link: "/blogs/nextjs-tricks" }
      ]
    }
  ]
});

export default HeroWithBlogs;
