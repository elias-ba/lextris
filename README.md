# Lextris

Lextris is an open-source 2D JavaScript puzzle game that combines the fast-paced mechanics of Tetris with the challenge of word games.  
Letters fall as blocks, and players must form valid words to clear lines, score points, and keep the board from filling up.

## Features
- Word + Tetris mashup: clear lines by forming valid words
- Dictionary-based validation with support for multiple languages
- Combos and multipliers for longer words and rare letters
- Designed to be easy to extend with new power-ups, themes, or modes

## Getting Started

### Clone the repo
```bash
git clone https://github.com/elias-ba/lextris.git
cd lextris
````

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Gameplay

* Move falling letters with **← / →**
* Rotate with **↑**
* Soft drop with **↓**
* Words are detected horizontally and vertically
* Valid words clear lines and earn points
* Longer words earn higher scores

## Roadmap

* Power-ups (wildcards, bombs, multipliers)
* Puzzle mode with predefined challenges
* Daily challenges and leaderboards
* Multiplayer battle mode
* Expanded dictionary support

## Tech Stack

* Vite for fast development and builds
* Phaser 3 for rendering and input
* Web Workers for word validation
* Web Audio API for sound effects

## Contributing

Contributions are welcome. You can help by:

* Adding features or mechanics
* Improving performance and code quality
* Designing new skins or themes
* Expanding word lists and dictionaries

To contribute:

1. Fork the repo
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgements

* Inspired by Tetris, Scrabble, and Wordle
* Thanks to the open-source community for ideas and contributions
