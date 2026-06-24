import Link from "next/link";

export const renderMessageWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    const isUrl = /^https?:\/\/[^\s]+$/.test(part);

    return isUrl ? (
      <Link
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
      >
        tap to open
      </Link>
    ) : (
      <span key={index}>{part}</span>
    );
  });
};
