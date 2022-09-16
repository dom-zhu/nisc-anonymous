import { Story } from 'models/story.model';

export const StoryCard = ({ story }: { story: Story }) => {
  return <div>{story.content}</div>;
};
