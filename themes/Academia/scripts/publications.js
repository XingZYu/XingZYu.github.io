hexo.log.info('Registering "pubs" helper from Academia theme.');
hexo.extend.helper.register('pubs', function() {
  try { 
    // Try to load publications from _data/publications.yml
    const pubs = this.site.data.publications;
    
    // Debug logging
    hexo.log.info("Publications data loaded:", !!pubs);
    hexo.log.info("Number of publications:", pubs?.length || 0);
    
    if (!pubs || pubs.length === 0) {
      return '<div class="warning">⚠️ No publications found. Check your _data/publications.yml</div>';
    }
    
    // Start building HTML output
    let output = `
      <div class="publications">
        <ul class="publication-list">`;

    // Process each publication
    pubs.forEach(pub => {
      // Format authors (handle both string and array inputs)
      const authorList = Array.isArray(pub.authors) 
        ? pub.authors.join(', ') 
        : pub.authors || 'Unknown Authors';

      // Build venue/year string
      const venueInfo = [pub.venue, pub.year].filter(Boolean).join(', ');

      // Build PDF link if available
      const pdfLink = pub.link 
        ? `<a href="${pub.link}" target="_blank" class="publication-link">[PDF]</a>` 
        : '';

      // Add to HTML output
      output += `
        <li class="publication-item">
          <div class="publication-title">${pub.title}</div>
          <div class="publication-authors">${authorList}</div>
          <div class="publication-info">
            <em>${venueInfo}</em>
            ${pdfLink}
          </div>
        </li>`;
    });

    // Close HTML containers
    output += `
        </ul>
      </div>`;

    return output;
  } catch (e) {
    hexo.log.error('Error in pubs helper:', e);
    return `<div class="error">❌ Error loading publications: ${e.message}</div>`;
  }
});