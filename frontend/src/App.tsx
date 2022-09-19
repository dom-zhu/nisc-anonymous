import { Box, Button, TextField } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchStories, submitStory } from 'api';
import { StoryCard } from 'components/StoryCard';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;

const Home = () => {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const storiesQuery = useQuery(['stories'], fetchStories);

  const submitStoryMutation = useMutation(submitStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stories']);
    },
  });

  const handleClick = async () => {
    submitStoryMutation.mutate(text);
  };

  const stories =
    storiesQuery.data?.filter((story) => story.parentId === null) ?? [];

  return (
    <Box>
      <Box
        sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <TextField
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleClick}>
          Submit post
        </Button>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Box>
    </Box>
  );
};
