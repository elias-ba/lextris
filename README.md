# Lextris

Lextris is an open-source 2D JavaScript puzzle game that combines the fast-paced mechanics of Tetris with the challenge of word games.  
Letters fall as blocks, and players must form valid words to clear lines, score points, and keep the board from filling up.

This repository is currently in **planning and early development**. The goal is to build Lextris step by step with a clear roadmap, while keeping the project open to contributors from the very beginning.

## Development Plan

### Phase 1 — Core Prototype
- [ ] Implement 10×20 grid and falling letter blocks
- [ ] Add basic player controls (move left/right, rotate, soft drop)
- [ ] Lock pieces when they reach the bottom or stack
- [ ] Render grid and letters with Canvas or Phaser
- [ ] Implement simple scoring system
- [ ] Integrate a small local dictionary for word validation
- [ ] Detect horizontal words and clear lines when valid

### Phase 2 — Basic Gameplay Loop
- [ ] Add vertical word detection
- [ ] Introduce level progression (faster falling over time)
- [ ] Display score, level, and cleared words on HUD
- [ ] Add simple sound effects (drop, word clear, game over)
- [ ] Game over screen + restart option

### Phase 3 — Polish & Features
- [ ] Combos and multipliers (bonuses for long words and rare letters)
- [ ] Power-ups (wildcards, bombs, multipliers)
- [ ] Expanded dictionary and multi-language support
- [ ] Configurable settings (volume, speed, theme)

### Phase 4 — Community & Scaling
- [ ] Puzzle mode with predefined challenges
- [ ] Daily challenge mode with seed-based boards
- [ ] Leaderboards (local first, then online)
- [ ] Mobile-friendly controls and layout
- [ ] Open up for community-created themes and mods

### Phase 5 — Advanced
- [ ] Multiplayer battle mode (send “garbage letters” to opponents)
- [ ] Progressive web app (PWA) for offline play
- [ ] Server integration (leaderboards, real-time multiplayer)
- [ ] Additional game modes (time attack, survival, sandbox)

## Tech Stack (Planned)
- Vite + TypeScript for development
- Phaser 3 (or Canvas 2D) for rendering and input
- Web Workers for dictionary lookups
- Web Audio API for sound effects
- IndexedDB for offline dictionary storage
- Deployment via GitHub Pages or Netlify

## Contributing
This project is at a very early stage. Contributions are welcome in the form of:
- Code (prototype features, refactors, bug fixes)
- Design (UI/UX, themes, logos, assets)
- Dictionaries (word lists for different languages)
- Ideas (new game modes, mechanics, feedback)

To get involved:
1. Fork the repo  
2. Create a branch: `git checkout -b feature/my-feature`  
3. Commit your changes: `git commit -m 'Add my feature'`  
4. Push: `git push origin feature/my-feature`  
5. Open a Pull Request  

## License
This project will be released under the MIT License. See the [LICENSE](LICENSE) file once it is created.

## Acknowledgements
- Inspired by Tetris, Scrabble, and Wordle  
- Thanks in advance to the open-source community that will help shape Lextris
