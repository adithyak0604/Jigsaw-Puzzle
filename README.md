# 🧩 Jigsaw Puzzle Game

A fun, interactive jigsaw puzzle game built with vanilla JavaScript, HTML, and CSS. Solve randomized 3x3 puzzles with a timer and enjoy smooth drag-and-drop gameplay!

## Features

- 🎮 **Interactive Gameplay** - Drag and drop puzzle pieces with smooth interactions
- 🖼️ **Random Images** - Each puzzle uses a different random image from Picsum Photos
- ⏱️ **Timer** - Track how long it takes you to complete each puzzle
- 📱 **Touch Support** - Works on both desktop and mobile devices
- ✨ **Smart Snap System** - Pieces automatically snap into place when close to the correct position
- 🎉 **Win Detection** - Automatic detection of puzzle completion with celebratory feedback
- 🔄 **New Game** - Quick button to load a new random puzzle
- 🌙 **Dark Theme** - Modern dark-themed UI with vibrant accent colors

## Technologies

- **HTML5** - Canvas API for rendering puzzle pieces
- **CSS3** - Responsive styling with animations
- **Vanilla JavaScript** - No frameworks or dependencies required
- **Picsum Photos API** - Random image generation

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/jigsaw-puzzle.git
   cd jigsaw-puzzle
   ```

2. Open in a web browser:
   - Simply open `index.html` in your preferred web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Then navigate to `http://localhost:8000`

## How to Play

1. **Start the Game** - Open the game and a random image will be split into 9 pieces
2. **Solve the Puzzle** - Drag the puzzle pieces around the canvas to match the original image
3. **Snap into Place** - When a piece gets close to the correct position (within 15 pixels), it automatically snaps into place
4. **Finish** - Click the "Finish" button to verify if your puzzle is complete
5. **Play Again** - Click "New Puzzle" to load a new random image and start over

## Project Structure

```
jigsaw-puzzle/
├── index.html          # Main HTML file with canvas and UI elements
├── style.css           # Styling and animations
├── script.js           # Game logic and interactivity
├── README.md           # Project documentation
└── [images]/           # Local image assets (optional)
```

## Game Configuration

You can customize the puzzle difficulty by modifying these constants in `script.js`:

- `ROWS` - Number of puzzle rows (default: 3)
- `COLS` - Number of puzzle columns (default: 3)
- `SNAP` - Snap distance in pixels (default: 15)

For example, to make a harder 4x4 puzzle:
```javascript
const ROWS = 4;
const COLS = 4;
```

## Features Explained

### Drag & Drop
- Click and hold a puzzle piece to drag it
- Release to drop it in place
- Works with both mouse and touch input

### Auto-Snap
- When a piece is within 15 pixels of its correct position, it automatically snaps into place
- Provides satisfying feedback and eases completion

### Timer
- Starts automatically when the game loads
- Pauses when you complete the puzzle or load a new game
- Useful for tracking your speedrunning attempts!

### Win Detection
- Automatically checks for puzzle completion when pieces are dropped
- "Finish" button allows manual verification
- Shows celebration overlay on success

## Future Enhancement Ideas

- 🎨 Different difficulty levels (2x2, 4x4, 5x5)
- 🏆 Leaderboard to track best times
- 🎵 Sound effects for piece snaps and puzzle completion
- 📊 Statistics tracking (best time, games played, etc.)
- 🌍 Local image upload support
- 💾 Save game state

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests with improvements

## Troubleshooting

**Images not loading?**
- Check your internet connection (images are fetched from Picsum Photos API)
- Ensure CORS is properly configured (already handled in code)

**Game feels slow?**
- Clear your browser cache
- Check your system resources
- Try a different browser

**Pieces not snapping?**
- Adjust the `SNAP` constant in `script.js` to increase snap distance
- Try dragging more precisely to the target location

---

Enjoy solving puzzles! 🎉
