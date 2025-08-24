import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export interface PostProps {
  author: string;
  title: string;
  text: string;
  date: string;
  profileUrl: string;
  numLikes: number;
  numComments: number;
  numShares: number;
}

export default function Post({ post }: { post: PostProps }) {
  return (
    <div>
      <PostHeader authorName={post.author} profileUrl={post.profileUrl} timestamp={post.date} />
      <PostContent title={post.title} text={post.text} />
      <PostFooter numLikes={post.numLikes} numComments={post.numComments} numShares={post.numShares} />
    </div>
  );
}
