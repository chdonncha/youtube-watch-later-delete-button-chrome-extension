function addDeleteButtons() {
  // Find all video rows that don't have our button yet
  const videoRows = document.querySelectorAll('ytd-playlist-video-renderer:not(.has-delete-btn)');

  videoRows.forEach(row => {
    row.classList.add('has-delete-btn');

    // Create the button
    const btn = document.createElement('button');
    btn.innerText = '🗑️';
    btn.className = 'quick-delete-btn';
    btn.title = 'Remove from Watch Later';

    // Logic to trigger YouTube's hidden menu
    btn.onclick = () => {
      const menuBtn = row.querySelector('button[aria-label="Action menu"]');
      if (menuBtn) {
        menuBtn.click(); // Open the menu
        
        // Wait a split second for the menu to appear in the DOM
        setTimeout(() => {
          const menuOptions = document.querySelectorAll('ytd-menu-service-item-renderer');
          const removeOpt = Array.from(menuOptions).find(opt => 
            opt.innerText.includes('Remove from')
          );
          if (removeOpt) removeOpt.click();
        }, 50);
      }
    };

    // Append the button to the row
    row.querySelector('#content').appendChild(btn);
  });
}

// Run every 2 seconds to catch new videos as you scroll
setInterval(addDeleteButtons, 2000);
