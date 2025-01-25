import ArticleImage from "./ArticleImage";
import { Article } from "../lib/types";
import { CalendarIcon } from "@heroicons/react/20/solid";
import * as motion from "motion/react-client";

interface Props {
  article: Article;
}

const ArticleListItem = ({ article }: Props) => {
  const { urlToImage, url, title, description } = article;
  return (
    <motion.li
      className="relative border-b p-4 @container/article hover:bg-light-theme @md:p-6"
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeIn" }}
    >
      <div className="flex h-full flex-col flex-nowrap gap-4 @lg/article:flex-row">
        <div className="w-full shrink-0 self-start @lg/article:w-40">
          <div className="aspect-video max-w-96 overflow-hidden rounded-lg @lg/article:w-full">
            <ArticleImage
              className="h-full w-full object-cover object-center"
              src={urlToImage}
            />
          </div>
        </div>
        <div className="flex max-w-full grow flex-col justify-between">
          <div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="stretched-link text-primary"
            >
              <h3 className="text-lg font-semibold leading-snug">{title}</h3>
            </a>
            <p
              className="mt-1 text-sm text-medium"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>
          <p className="mt-2 text-right text-xs font-light italic text-medium">
            <CalendarIcon className="inline size-4 align-top" />{" "}
            {new Date(article.publishedAt).toDateString()}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

export default ArticleListItem;
