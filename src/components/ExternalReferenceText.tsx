import { referenceParts } from "@/lib/externalReferences";

export default function ExternalReferenceText({ text }: { text: string }) {
  return <>{referenceParts(text).map((part, index) => part.href ? (
    <a key={index} href={part.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">{part.text}</a>
  ) : part.text)}</>;
}