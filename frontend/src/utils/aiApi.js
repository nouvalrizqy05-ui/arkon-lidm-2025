import api from './api';

export const chatWithTutor = async (message, context) => {
  try {
    const response = await api.post('/ai/chat', { message, context });
    return response.data.reply;
  } catch (error) {
    console.error("Error chatting with AI:", error);
    throw error;
  }
};

export const generateQuiz = async (topic, weakness) => {
  try {
    const response = await api.post('/ai/generate-quiz', { topic, weakness });
    return response.data.quiz;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export const generateMindmap = async (text) => {
  try {
    const response = await api.post('/ai/generate-mindmap', { text });
    return response.data;
  } catch (error) {
    console.error("Error generating mindmap:", error);
    throw error;
  }
};
