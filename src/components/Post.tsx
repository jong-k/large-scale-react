interface Post {
  author: string;
  title: string;
  text: string;
  date: string;
  profileUrl: string;
  numLikes: number;
  numComments: number;
  numShares: number;
}

export default function Post({ post }: { post: Post }) {
  return (
    <div>
      <img src={post.profileUrl} alt={`${post.author}'s profile`} />
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <div>Author: {post.author}</div>
      <div>Date: {post.date}</div>
      <p>{`${post.numLikes} likes`}</p>
      <p>{`${post.numComments} comments`}</p>
      <p>{`${post.numShares} shares`}</p>
      <button>Like</button>
      <button>Share</button>
      <button>Comment</button>
    </div>
  );
}
