'use strict';

// This public directory is a launcher. Authentication must happen at the trainer.
// Keep entries disabled until both HTTPS and access protection are verified.
const allowedTrainerHosts = {
  medizin: 'medizin.es-planung-digitalisierung.de',
  ingenieur: 'ingenieur.es-planung-digitalisierung.de'
};

async function loadTrainerEntries() {
  try {
    const response = await fetch('trainings.config.json', { cache: 'no-store' });
    if (!response.ok) return;
    const config = await response.json();
    for (const key of Object.keys(allowedTrainerHosts)) {
      if (typeof config[key] !== 'string') continue;
      const url = new URL(config[key]);
      if (url.protocol !== 'https:' || url.hostname !== allowedTrainerHosts[key] || url.username || url.password || url.port !== '8443' || url.search || url.hash || url.pathname !== '/') continue;
      const button = document.querySelector(`[data-trainer="${key}"]`);
      if (!button) continue;
      const link = document.createElement('a');
      link.href = url.href;
      link.className = 'training-entry';
      link.textContent = 'Geschützten Lerntrainer öffnen';
      const status = button.closest('article').querySelector('.training-status');
      status.textContent = 'Persönlicher Zugang erforderlich';
      button.replaceWith(link);
    }
  } catch {
    // No fallback to local addresses, insecure URLs or unverified services.
  }
}
loadTrainerEntries();
