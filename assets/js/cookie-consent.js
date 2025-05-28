/**
 * Cookie consent functionality for ftnilsson.github.io
 */
(function() {
  // Check if user has already made a cookie choice
  function hasUserConsented() {
    return localStorage.getItem('cookieConsent') === 'accepted';
  }

  function hasUserDeclined() {
    return localStorage.getItem('cookieConsent') === 'declined';
  }

  // Save user choice to local storage
  function saveConsent(choice) {
    localStorage.setItem('cookieConsent', choice);
  }
  // Display the cookie banner if no choice has been made yet
  function showCookieConsentBanner() {
    console.log('Checking cookie consent status');
    console.log('Has consented:', hasUserConsented());
    console.log('Has declined:', hasUserDeclined());
    
    if (!hasUserConsented() && !hasUserDeclined()) {
      console.log('Should show banner');
      const banner = document.getElementById('cookie-banner');
      console.log('Banner element:', banner);
      if (banner) {
        banner.classList.add('show');
        console.log('Added show class to banner');
      }
    }
  }

  // Handle accept button click
  function handleAccept() {
    saveConsent('accepted');
    hideBanner();
    enableAnalytics(); // Enable analytics after consent
  }

  // Handle decline button click
  function handleDecline() {
    saveConsent('declined');
    hideBanner();
  }

  // Hide the banner
  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
    }
  }
  // Enable Google Analytics
  function enableAnalytics() {
    const analyticsId = window.analyticsId;
    if (!analyticsId) return;
    
    // Load Google Tag Manager script dynamically after consent
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(gtagScript);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', analyticsId);
    
    // Keep backwards compatibility with older analytics.js if it exists
    if (typeof ga !== 'undefined') {
      ga('create', analyticsId, 'auto');
      ga('send', 'pageview');
    }
  }
  // Function to initialize everything
  function initCookieConsent() {
    console.log('Initializing cookie consent');
    
    // Check if we should show the banner
    showCookieConsentBanner();

    // Add event listeners to buttons
    const acceptButton = document.getElementById('cookie-accept');
    const declineButton = document.getElementById('cookie-decline');
    
    console.log('Accept button:', acceptButton);
    console.log('Decline button:', declineButton);
    
    if (acceptButton) {
      acceptButton.addEventListener('click', handleAccept);
    }
    
    if (declineButton) {
      declineButton.addEventListener('click', handleDecline);
    }

    // Enable analytics if consent was previously given
    if (hasUserConsented()) {
      console.log('User has previously consented, enabling analytics');
      enableAnalytics();
    }
  }

  // Initialize the banner when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    // DOM already loaded
    initCookieConsent();
  }
})();
