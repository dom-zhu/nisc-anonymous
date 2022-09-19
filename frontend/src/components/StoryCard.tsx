import { Box, Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitComment } from 'api';
import { Story } from 'models/story.model';
import { useState } from 'react';
import { useStories } from 'useStories';

export const StoryCard = ({ story }: { story: Story }) => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const [addCommentOpen, setAddCommentOpen] = useState(false);

  const { storiesQuery } = useStories();

  const submitCommentMutation = useMutation(submitComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stories']);

      setAddCommentOpen(false);
    },
  });

  const handleAddCommentClick = () => {
    submitCommentMutation.mutate({ comment, storyId: story.id });
  };

  // TODO: sort dates
  const children =
    storiesQuery.data?.filter((thing) => thing.parentId === story.id) ?? [];

  return (
    <Box
      sx={{
        borderLeft: '1px solid grey',
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <span>{story.date}</span>
      <Box sx={{ padding: 1, borderRadius: '5px' }}>{story.content}</Box>
      <Button onClick={() => setAddCommentOpen((p) => !p)}>Reply</Button>
      {addCommentOpen && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            marginBottom: 2,
          }}
        >
          <TextField
            onChange={(e) => setComment(e.target.value)}
            multiline
            maxRows={4}
          />
          <Button variant="contained" onClick={handleAddCommentClick}>
            Add comment
          </Button>
        </Box>
      )}
      {children.map((child) => (
        <StoryCard key={child.id} story={child} />
      ))}
    </Box>
  );
};
