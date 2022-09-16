import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { StoryCard } from 'components/StoryCard';
import { useState } from 'react';
import { Story } from 'models/story.model';

const baseUrl = 'http://localhost:3000';

function App() {
  const [stories, setStories] = useState([] as Story[]);

  const { fetchStories } = useStories();

  const handleClick = async () => {
    const r = await fetchStories();

    setStories(r);
  };

  return (
    <div className="App">
      <TextField multiline rows={4} />
      <Button onClick={handleClick}>hello world</Button>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}

export default App;

const useStories = () => {
  const fetchStories = async () => {
    return (await axios.get(`${baseUrl}/Stories`)).data as Story[];
  };

  return { fetchStories };
};
