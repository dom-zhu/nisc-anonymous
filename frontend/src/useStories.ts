import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStories, submitStory } from 'api';

export const useStories = () => {
  const queryClient = useQueryClient();

  const storiesQuery = useQuery(['stories'], fetchStories);

  const submitStoryMutation = useMutation(submitStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stories']);
    },
  });

  return { storiesQuery, submitStoryMutation };
};
