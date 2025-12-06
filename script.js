function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    timeElement.textContent = `${hours}:${minutes} ${ampm}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Draggable Windows Logic (Simplified)
// Uses simple mousedown/mousemove/mouseup on title-bars
document.querySelectorAll('.title-bar').forEach(titleBar => {
    let isDragging = false;
    let initialX, initialY;
    let currentX, currentY;
    let xOffset = 0, yOffset = 0;

    // Find the parent window
    const windowEl = titleBar.closest('.window');

    titleBar.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Initial position needs to be relative if utilizing transform
    // But since we are using flexbox layout, transform is better for dragging

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target.closest('.title-bar-controls')) return; // Don't drag if clicking buttons

        isDragging = true;

        // Z-index management: Bring to front
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 1);
        windowEl.style.zIndex = 10;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, windowEl);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }
});
