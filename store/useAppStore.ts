import { create } from 'zustand';
import { challenges as sampleChallenges } from '../data/challenges';

function randomUser(): string {
  const first = ['Ava','Liam','Mia','Noah','Zoe','Ethan','Ivy','Kai','Luna','Milo','Nina','Owen'];
  const last = ['Runner','Jumper','Archer','Sprinter','Diver','Rower','Skater','Climber','Boxer','Swimmer'];
  const f = first[Math.floor(Math.random()*first.length)];
  const l = last[Math.floor(Math.random()*last.length)];
  const num = Math.floor(10 + Math.random()*89);
  return `${f}${l}${num}`;
}

function randomVotes(): number {
  return Math.floor(Math.random()*50); // 0-49
}

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
  videoUrl: any; // require(...) module for local assets or remote URI
  votes: number;
};

type AppState = {
  userId: string;
  challenges: Challenge[];
  activeChallengeId: string;
  videos: Video[];
  votesUsedToday: Record<string, number>;
  votedVideoIdsByUser: Record<string, Set<string>>;
  seedLocalVideos: () => void;
  submitVideo: (caption: string, videoUrl: any) => void;
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

  seedLocalVideos: () => {
    const existing = get().videos;
    if (existing.length > 0) return; // seed once per session
    const seeded: Video[] = [
      {
        id: 'v1',
        user: randomUser(),
        caption: 'Training day grind 💪',
        videoUrl: require('../assets/videos/videoblocks-144z_trip_drone_154_h_ghcnhnin__dd5a38ed0ad749bd851e95e26be07732__P360.mp4'),
        votes: randomVotes(),
      },
      {
        id: 'v2',
        user: randomUser(),
        caption: 'Focus and form 🎯',
        videoUrl: require('../assets/videos/videoblocks-653165228815972af31ef4f9_hhwpk30gt__842cba157a9d3f450f3b85de5ff09b94__P360.mp4'),
        votes: randomVotes(),
      },
      {
        id: 'v3',
        user: randomUser(),
        caption: 'Leg day to gold day 🥇',
        videoUrl: require('../assets/videos/videoblocks-school-of-fish-sharks-swim-in-a-circle_smleuo42x__ae0948b48456559f121e6125f162592c__P360.mp4'),
        votes: randomVotes(),
      },
    ];
    set({ videos: seeded });
  },

  submitVideo: (caption: string, videoUrl: any) => {
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


