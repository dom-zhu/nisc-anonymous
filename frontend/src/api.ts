import axios from 'axios';
import { Story } from 'models/story.model';

const baseUrl = 'http://localhost:3000';

export const fetchStories = async () => {
  const response = await axios.get(`${baseUrl}/stories`);
  return response.data as Story[];
};

export const submitStory = (content: string) => {
  return axios.post(`${baseUrl}/story`, { content });
};

export const submitComment = ({
  storyId,
  comment,
}: {
  storyId: string;
  comment: string;
}) => {
  return axios.post(`${baseUrl}/story/${storyId}/comment`, {
    content: comment,
  });
};
