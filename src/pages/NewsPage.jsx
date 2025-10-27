import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import about from "../content/about.md?raw";

const NewsPage = () => {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto px-4 py-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{about}</ReactMarkdown>
    </div>
  );
};

export default NewsPage;

