import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

export interface Post {
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
      <PostHeader
        authorName={post.author}
        profileUrl={post.profileUrl}
        timestamp={post.date}
      />
      <PostContent title={post.title} text={post.text} />
      <PostFooter
        numLikes={post.numLikes}
        numComments={post.numComments}
        numShares={post.numShares}
      />
    </div>
  );
}
