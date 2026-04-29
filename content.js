function addDeleteButtons() {
  // 1. Find all video rows
  const videoRows = document.querySelectorAll('ytd-playlist-video-renderer:not(.has-delete-btn)');

  videoRows.forEach(row => {
    // 2. Find the container to place our button (the metadata area)
    const container = row.querySelector('#meta');
    if (!container) return;

    row.classList.add('has-delete-btn');

    // 3. Create our "Quick Remove" button
    const btn = document.createElement('button');
    btn.innerText = 'X';
    btn.className = 'quick-delete-btn';
    btn.title = 'Remove from Watch Later';

    btn.onclick = (e) => {
      e.preventDefault();
      
      // Find the three-dot menu button for THIS specific row
      const menuBtn = row.querySelector('button[aria-label="Action menu"]');
      if (menuBtn) {
        menuBtn.click();

        // 4. Wait for the popup menu to appear (as seen in image_9a1797.png)
        setTimeout(() => {
          const menuOptions = document.querySelectorAll('ytd-menu-service-item-renderer');
          
          // Look for the option that contains the text from your screenshot
          const removeOpt = Array.from(menuOptions).find(opt => {
            const text = opt.innerText || "";
            return text.includes('Remove from Watch later');
          });

          if (removeOpt) {
            removeOpt.click();
            // Optional: Hide the row immediately for a snappy feel
            row.style.opacity = '0.3';
            row.style.pointerEvents = 'none';
          }
        }, 100);
      }
    };

    container.appendChild(btn);
  });
}

// Run the check every second
setInterval(addDeleteButtons, 1000);
