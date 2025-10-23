# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript website featuring a time progress bar tracking the journey from July 12, 2024 to July 12, 2029, with a press clippings section below for collecting news articles and social media posts.

## Project Structure

```
.
├── index.html    # Main HTML structure
├── style.css     # All styling and responsive design
├── script.js     # Progress bar logic and clipping management
├── person.png    # Image of person that moves along the progress bar (white background)
└── CLAUDE.md     # This file
```

## Key Configuration

### Progress Bar Settings

The progress bar dates are configured in `script.js`:

```javascript
const startDate = new Date('2024-07-12T00:00:00').getTime();
const endDate = new Date('2029-07-12T00:00:00').getTime();
```

To change the timeline:
1. Modify `startDate` in `script.js:2` with format 'YYYY-MM-DDTHH:MM:SS'
2. Modify `endDate` in `script.js:3` with format 'YYYY-MM-DDTHH:MM:SS'

### Person Image

The progress bar displays an animated person image (`person.png`) that moves from right to left as time progresses:
- Image should have a white/transparent background
- Recommended size: small person figure (will be displayed at 80px height on desktop, 60px on mobile)
- Position: Starts at 100% (right side) on July 12, 2024, moves to 0% (left side) by July 12, 2029
- Image path is referenced in `index.html:19`

### Adding Press Clippings

There are two methods to add press clippings:

**Method 1: Direct HTML (in index.html)**
Add new `<article>` elements inside the `clippings-grid` div in `index.html:49-75`:

```html
<article class="clipping">
    <div class="clipping-source">Source Name</div>
    <h3 class="clipping-title"><a href="URL" target="_blank">Title</a></h3>
    <p class="clipping-excerpt">Excerpt text...</p>
    <time class="clipping-date">YYYY-MM-DD</time>
</article>
```

**Method 2: JavaScript (in script.js)**
Use the `addClipping()` function in `script.js:47-60`:

```javascript
addClipping(
    'Source Name',
    'Article Title',
    'https://url.com',
    'Excerpt text...',
    'YYYY-MM-DD'
);
```

## Development

### Running Locally

Open `index.html` directly in a web browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000`

### Customization

**Colors**: The gradient background and accent colors are defined in `style.css`:
- Primary gradient: `#667eea` to `#764ba2` (style.css:11)
- Progress bar gradient: `#667eea` to `#764ba2` (style.css:74)
- Accent color: `#667eea` (used throughout for highlights)

**Progress Bar Appearance**:
- Bar height: 60px on desktop (style.css:63), 40px on mobile (style.css:171)
- Border radius: 30px for rounded corners (style.css:65)
- Person image height: 80px on desktop (style.css:83), 60px on mobile (style.css:175)

**Responsive Design**: Mobile breakpoint is set at 768px in `style.css:160-186`

**Update Frequency**: The progress bar updates every hour (script.js:43)

## Architecture Notes

- Pure vanilla JavaScript, no frameworks or dependencies
- Progress bar calculates percentage based on elapsed time from start date to current date
- Person image animates from right (100%) to left (0%) as time progresses
- Days remaining calculated from current browser date to end date (July 12, 2029)
- Grid layout for clippings automatically adjusts to screen size
- All styling uses modern CSS (flexbox and grid)
- Mobile-first responsive design approach

## How the Progress Bar Works

1. **Start date**: July 12, 2024 (right side of progress bar)
2. **End date**: July 12, 2029 (left side of progress bar)
3. **Person movement**: Moves from right to left as time passes
4. **Progress fill**: Fills from left to right (opposite of person movement)
5. **Days counter**: Shows exact number of days remaining until July 12, 2029
