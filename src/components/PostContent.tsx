export default function PostContent({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
