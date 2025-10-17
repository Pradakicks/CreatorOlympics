# Creator Olympics (MVP)

Local-only Expo app demonstrating a daily Olympic-themed challenge where users mock-upload short videos, vote on others, and view a leaderboard. No backend; data resets on reload.

## Tech
- Expo (managed)
- Expo Router (tabs)
- React Native Paper (UI)
- Zustand (state)

## Run
```bash
npm install
npx expo start
```

## Screens
- Home: today’s challenge + buttons to Upload, Vote, Leaderboard
- Upload: caption input + mock thumbnail, submit shows toast
- Vote: scrollable cards, 👍 vote with 10 votes/day limit
- Leaderboard: top 10 by votes with 🥇🥈🥉 and highlight own video

## Data
- Mock `challenges` in `data/challenges.ts`
- `store/useAppStore.ts` holds videos and vote logic
- Assets in `assets/`

## Future Integration Hooks
- Upload: replace placeholder with real picker and backend upload
- Auth: replace mock `userId` with real auth
- Persistence: add AsyncStorage or backend API

