export default function PostHeader({
  authorName,
  profileUrl,
  timestamp,
}: {
  authorName: string;
  profileUrl: string;
  timestamp: string;
}) {
  return (
    <div>
      <img src={profileUrl} alt={`${authorName}'s profile`} />
      <p>{authorName}</p>
      <p>{timestamp}</p>
    </div>
  );
}
