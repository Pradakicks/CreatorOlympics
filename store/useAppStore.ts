import { create } from 'zustand';
import { challenges as sampleChallenges } from '../data/challenges';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  image: any; // require(...) for local asset
  date: string;
};

export type Video = {
  id: string;
  user: string;
  caption: string;
  videoUrl: string;
  votes: number;
};

type AppState = {
  userId: string;
  challenges: Challenge[];
  activeChallengeId: string;
  videos: Video[];
  votesUsedToday: Record<string, number>;
  votedVideoIdsByUser: Record<string, Set<string>>;
  submitVideo: (caption: string, videoUrl: string) => void;
  canVote: (videoId: string) => boolean;
  vote: (videoId: string) => void;
  topVideos: (limit?: number) => Video[];
};

export const useAppStore = create<AppState>((set, get) => ({
  userId: 'creator_olympian',
  challenges: sampleChallenges,
  activeChallengeId: sampleChallenges[0]?.id ?? 'day1',
  videos: [],
  votesUsedToday: {},
  votedVideoIdsByUser: {},

  submitVideo: (caption: string, videoUrl: string) => {
    const { userId } = get();
    const newVideo: Video = {
      id: `${Date.now()}`,
      user: userId,
      caption,
      videoUrl,
      votes: 0,
    };
    set((state) => ({ videos: [newVideo, ...state.videos] }));
  },

  canVote: (videoId: string) => {
    const { userId, votesUsedToday, votedVideoIdsByUser } = get();
    const used = votesUsedToday[userId] || 0;
    if (used >= 10) return false;
    const setForUser = votedVideoIdsByUser[userId];
    if (setForUser && setForUser.has(videoId)) return false;
    return true;
  },

  vote: (videoId: string) => {
    const { userId, canVote } = get();
    if (!canVote(videoId)) return;
    set((state) => {
      const updated = state.videos.map((v) =>
        v.id === videoId ? { ...v, votes: v.votes + 1 } : v
      );
      const used = (state.votesUsedToday[userId] || 0) + 1;
      const setForUser = new Set(state.votedVideoIdsByUser[userId] || []);
      setForUser.add(videoId);
      return {
        videos: updated,
        votesUsedToday: { ...state.votesUsedToday, [userId]: used },
        votedVideoIdsByUser: { ...state.votedVideoIdsByUser, [userId]: setForUser },
      };
    });
  },

  topVideos: (limit = 10) => {
    const videos = get().videos;
    return [...videos].sort((a, b) => b.votes - a.votes).slice(0, limit);
  },
}));


