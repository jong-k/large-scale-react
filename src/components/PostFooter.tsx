export default function PostFooter({
  numLikes,
  numComments,
  numShares,
}: {
  numLikes: number;
  numComments: number;
  numShares: number;
}) {
  return (
    <div>
      <p>{`${numLikes} likes`}</p>
      <p>{`${numComments} comments`}</p>
      <p>{`${numShares} shares`}</p>
      <p>아래 버튼 동작 안함</p>
      <button>Like</button>
      <button>Share</button>
      <button>Comment</button>
    </div>
  );
}
