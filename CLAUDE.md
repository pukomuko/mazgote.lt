# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"žmogus mazgotė" - A static HTML/CSS/JavaScript website featuring a time progress bar tracking the journey from July 12, 2024 to July 12, 2029, with a press clippings section below for collecting news articles and social media posts. The site uses Lithuanian language for labels and content.

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

**Progress Bar Features:**
- **Clickable**: The entire progress bar links to `https://www.vrk.lt/numatomi` (opens in new tab)
- **Position**: Located at the top of the page, full width with white background
- **Layout**: Person image sits on top of the bar, dates and day counter are below
- **Days counter**: Displays in Lithuanian "Liko XX dienos" (XX days remaining)
- **Dates**: Shown as "2024 Liepos 12" and "2029 Liepos 12"

### Person Image

The progress bar displays an animated person image (`person.png`) that moves along the bar as time progresses:
- Image should have a white/transparent background
- Recommended size: small person figure (will be displayed at 120px height on desktop, 60px on mobile)
- Position: Sits **on top** of the progress bar (not inside it)
- Movement: Starts at 0% (left side) on July 12, 2024, moves to 100% (right side) by July 12, 2029
- CSS positioning uses `translateX(-50%)` to center the image on the exact progress point
- Image path is referenced in `index.html:16`

### Adding Press Clippings

The site supports two types of press clippings: regular single clippings and dual-perspective clippings.

#### Regular Single Clipping

**Method 1: Direct HTML (in index.html)**
Add new `<article>` elements inside the `clippings-grid` div:

```html
<article class="clipping">
    <div class="clipping-source">FB</div>
    <h3 class="clipping-title"><a href="URL" target="_blank">Title</a></h3>
    <p class="clipping-excerpt">Excerpt text...</p>
    <time class="clipping-date">2025-10-22</time>
</article>
```

**Method 2: JavaScript (in script.js)**
Use the `addClipping()` function:

```javascript
addClipping(
    'LRT.LT',
    'Article Title',
    'https://www.lrt.lt/article',
    'Excerpt text...',
    '2025-10-22'
);
```

#### Dual-Perspective Clipping

Shows two perspectives/articles about the same event in one box, separated by a gray line.

**Method 1: Direct HTML (in index.html)**

```html
<article class="clipping-dual">
    <div class="dual-perspective">
        <div class="perspective-item">
            <div class="clipping-source">LRT.LT</div>
            <h3 class="clipping-title"><a href="URL1" target="_blank">Title 1</a></h3>
            <p class="clipping-excerpt">First perspective...</p>
            <time class="clipping-date">2025-10-21</time>
        </div>
        <div class="perspective-item">
            <div class="clipping-source">LRT.LT</div>
            <h3 class="clipping-title"><a href="URL2" target="_blank">Title 2</a></h3>
            <p class="clipping-excerpt">Second perspective...</p>
            <time class="clipping-date">2025-10-23</time>
        </div>
    </div>
</article>
```

**Method 2: JavaScript (in script.js)**
Use the `addDualPerspectiveClipping()` function:

```javascript
addDualPerspectiveClipping(
    'LRT.LT', 'Title 1', 'https://url1.com', 'First perspective...', '2025-10-21',
    'LRT.LT', 'Title 2', 'https://url2.com', 'Second perspective...', '2025-10-23'
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
- Primary gradient: `#667eea` to `#764ba2` (purple theme)
- Progress bar gradient: `#667eea` to `#764ba2`
- Accent color: `#667eea` (used throughout for highlights)
- Contact link: `#667eea` with semi-transparent white background

**Page Structure**:
- **Header**: "žmogus mazgotė" title with purple gradient background
- **Progress Bar**: Full-width white section with clickable bar, person image on top, labels below
- **Press Clippings**: Masonry-style grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- **Footer**: Centered mailto link with muted styling

**Progress Bar Appearance**:
- Bar height: 60px on desktop, 40px on mobile
- Border radius: 30px for rounded corners
- Person image height: 120px on desktop, 60px on mobile
- Person positioned on top of bar using `bottom: 60px` (desktop) or `bottom: 40px` (mobile)
- Hover effect: bar lifts slightly with shadow

**Press Clippings Layout**:
- Uses CSS columns for masonry layout (`column-count: 3` on desktop)
- Items are auto-height based on content
- `break-inside: avoid` prevents items from splitting across columns
- Responsive: 3 columns (desktop), 2 columns (tablet 769-1024px), 1 column (mobile ≤768px)

**Responsive Design**:
- Mobile breakpoint: ≤768px
- Tablet breakpoint: 769-1024px
- Desktop: >1024px

**Update Frequency**: The progress bar updates every hour (script.js:43)

## Architecture Notes

- Pure vanilla JavaScript, no frameworks or dependencies
- Progress bar calculates percentage based on elapsed time from start date to current date
- Person image animates from left (0%) to right (100%) as time progresses
- Days remaining calculated from current browser date to end date (July 12, 2029)
- Masonry layout for clippings using CSS columns (not grid)
- All styling uses modern CSS (flexbox, CSS columns)
- Mobile-first responsive design approach
- Lithuanian language throughout ("Liko XX dienos", "2024 Liepos 12", etc.)

## How the Progress Bar Works

1. **Start date**: July 12, 2024 (left side = 0%)
2. **End date**: July 12, 2029 (right side = 100%)
3. **Person movement**: Moves from left (0%) to right (100%) as time passes
4. **Progress fill**: Fills from left to right, matching person movement
5. **Days counter**: Shows "Liko XX dienos" (XX days remaining until July 12, 2029)
6. **Person positioning**: Uses `left: percentage%` with `translateX(-50%)` to center the image on the exact progress point
7. **Clickable**: Entire progress bar is wrapped in a link to VRK website

## Page Components

### Header
- Main title: "žmogus mazgotė"
- Purple gradient background matching page theme
- Responsive font sizing (3rem desktop, 2rem mobile)

### Progress Bar Section
- White background, full width
- Person image positioned absolutely on top of the bar
- Progress bar is clickable (links to https://www.vrk.lt/numatomi)
- Labels below: start date, days remaining, end date
- Hover effect on bar for visual feedback

### Press Clippings Section
- White rounded box with shadow
- Masonry grid using CSS columns
- Two clipping types: single and dual-perspective
- Auto-height items based on content
- Responsive column count

### Footer
- Mailto link: "Atsiųskit naujų nuotykių"
- Email: pukomuko@gmail.com
- Muted purple styling with hover effect

## Common Customizations

**Change progress dates**: Edit `startDate` and `endDate` in script.js:2-3

**Update person image**: Replace `person.png` (recommend white/transparent background, small figure)

**Add single clipping**: Use `addClipping()` function or add HTML `<article class="clipping">`

**Add dual-perspective clipping**: Use `addDualPerspectiveClipping()` function or add HTML `<article class="clipping-dual">`

**Change colors**: Modify gradient colors in style.css (search for `#667eea` and `#764ba2`)

**Adjust masonry columns**: Change `column-count` in `.clippings-grid` (style.css:134)
