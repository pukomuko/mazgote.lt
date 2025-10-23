// Progress bar dates
const startDate = new Date('2024-07-12T00:00:00').getTime();
const endDate = new Date('2029-07-12T00:00:00').getTime();

function updateProgress() {
    const now = new Date().getTime();

    // Calculate total duration and elapsed time
    const totalDuration = endDate - startDate;
    const elapsed = now - startDate;
    const remaining = endDate - now;

    // Calculate percentage (0-100)
    let percentage = (elapsed / totalDuration) * 100;

    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    // Calculate days remaining
    const daysRemaining = Math.ceil(remaining / (1000 * 60 * 60 * 24));

    // Update progress bar fill
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percentage + '%';

    // Update person position (moves from right to left as time progresses)
    // Person starts at 100% (right) and moves to 0% (left)
    const personPosition = percentage;
    const progressPerson = document.getElementById('progressPerson');
    progressPerson.style.left = personPosition + '%';

    // Update days remaining text
    const daysRemainingEl = document.getElementById('daysRemaining');
    if (remaining > 0) {
        daysRemainingEl.textContent = `Liko ${daysRemaining.toLocaleString()} dienos`;
    } else {
        daysRemainingEl.textContent = 'Kelionė baigta!';
    }
}

// Update progress immediately and then daily
updateProgress();
setInterval(updateProgress, 1000 * 60 * 60); // Update every hour

// Optional: Function to dynamically add clippings
// You can call this function to add new clippings programmatically
function addClipping(source, title, url, excerpt, date) {
    const clippingsGrid = document.getElementById('clippingsGrid');

    const article = document.createElement('article');
    article.className = 'clipping';

    article.innerHTML = `
        <div class="clipping-source">${source}</div>
        <h3 class="clipping-title"><a href="${url}" target="_blank">${title}</a></h3>
        <p class="clipping-excerpt">${excerpt}</p>
        <time class="clipping-date">${date}</time>
    `;

    clippingsGrid.appendChild(article);
}

// Function to add dual-perspective clippings (two views of the same story)
function addDualPerspectiveClipping(
    source1, title1, url1, excerpt1, date1,
    source2, title2, url2, excerpt2, date2
) {
    const clippingsGrid = document.getElementById('clippingsGrid');

    const article = document.createElement('article');
    article.className = 'clipping-dual';

    article.innerHTML = `
        <div class="dual-perspective">
            <div class="perspective-item">
                <div class="clipping-source">${source1}</div>
                <h3 class="clipping-title"><a href="${url1}" target="_blank">${title1}</a></h3>
                <p class="clipping-excerpt">${excerpt1}</p>
                <time class="clipping-date">${date1}</time>
            </div>
            <div class="perspective-item">
                <div class="clipping-source">${source2}</div>
                <h3 class="clipping-title"><a href="${url2}" target="_blank">${title2}</a></h3>
                <p class="clipping-excerpt">${excerpt2}</p>
                <time class="clipping-date">${date2}</time>
            </div>
        </div>
    `;

    clippingsGrid.appendChild(article);
}

// Example: How to add clippings via JavaScript
// Uncomment and modify these examples to add more clippings dynamically
/*
// Regular single clipping
addClipping(
    'Tech News',
    'Amazing New Technology Released',
    'https://example.com/article',
    'This is an exciting development in the tech world...',
    '2025-10-23'
);

// Dual perspective clipping (two views of the same story)
addDualPerspectiveClipping(
    'LRT.LT',
    'Nausėda paprašė Šakalienės neteikti atsistatydinimo pareiškimo',
    'https://www.lrt.lt/article1',
    'Prezidentas paprašė ministrės dar palaukti...',
    '2025-10-21',
    'LRT.LT',
    'Prezidentas apie Šakalienės likimą: tai buvo 10–15 minučių reikalas',
    'https://www.lrt.lt/article2',
    'Vertindamas ministrės pasitraukimą, prezidentas teigė...',
    '2025-10-23'
);
*/
