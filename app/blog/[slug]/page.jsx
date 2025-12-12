import { articles } from "@/data/articles";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function ArticleDetails({ params }) {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="py-40 text-center text-red-600 text-xl">
        Article not found.
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 lg:px-24 flex justify-center">
      <div className="w-full max-w-[900px]">

        {/* MAIN BIG TITLE */}
        <h1 className="text-[42px] md:text-[48px] font-bold text-[#0B3A6F] leading-[1.15] mb-4">
          {article.title}
        </h1>

        {/* GRAY DIVIDER */}
        <div className="w-full h-[1.5px] bg-gray-300 mb-10"></div>

        {/* MAIN CONTENT */}
        <div className="prose max-w-none text-[#1A1A1A]">
          <ReactMarkdown
           
            components={{
              h1: () => null, 
              h2: ({ node, ...props }) => (
                <h2
                  className="text-[24px] font-bold text-[#0B3A6F] mt-10 mb-4 leading-tight"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-[20px] font-semibold text-[#0B3A6F] mt-8 mb-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-[16px] leading-[1.85] text-[#333] mb-4"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-[16px] leading-[1.7] text-[#333] ml-1 mb-1"
                  {...props}
                />
              ),
              hr: () => <hr className="border-t border-gray-300 my-6" />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-block mt-14 bg-[#0B3A6F] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#093058] transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
