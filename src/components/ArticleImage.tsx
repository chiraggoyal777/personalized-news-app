import React, { useState } from "react";
import articlePlaceholder from "../assets/article-placeholder.png";

// Discriminated union for props
type ImageProps = {
  src: string; // Requires `src` for the image
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  asPlaceholder?: never;
};

type ImagePropsPlaceholder = {
  asPlaceholder: true;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  src?: never;
};

type ArticleImageProps = ImageProps | ImagePropsPlaceholder;

const ArticleImage: React.FC<ArticleImageProps> = (props) => {
  const {
    src,
    alt = "",
    className,
    fallbackSrc = articlePlaceholder,
    asPlaceholder
  } = props as ImageProps & ImagePropsPlaceholder; // Type assertion for destructuring

  // Determine the initial image source
  const [imgSrc, setImgSrc] = useState(
    asPlaceholder ? fallbackSrc : src || fallbackSrc
  );

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      width="100%"
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ArticleImage;
