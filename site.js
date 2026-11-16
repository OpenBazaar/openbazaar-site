document.documentElement.classList.add('js');

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const screens = {
  marketplace: {
    src: 'assets/marketplace.jpg',
    alt: 'The OpenBazaar desktop alpha: a search bar, categories, and home goods from independent demo stores, priced in test coins.',
    caption: 'Browse stores run by the people who own them',
    title: 'Marketplace',
  },
  wallet: {
    src: 'assets/wallet.jpg',
    alt: 'The OpenBazaar desktop alpha: the built-in wallet with spendable and pending testnet4 balances and a receive address.',
    caption: 'The wallet lives in your app, not on a platform',
    title: 'Wallet',
  },
  orders: {
    src: 'assets/orders.jpg',
    alt: 'The OpenBazaar desktop alpha: a demo order awaiting payment, with options to pay from the app wallet or another wallet.',
    caption: 'Pay one seller directly for one order',
    title: 'Orders',
  },
};

const screen = document.querySelector('#product-screen');
const screenLink = document.querySelector('.screen-link');
const caption = document.querySelector('#screen-caption');
const panel = document.querySelector('#product-panel');
const dialog = document.querySelector('#screen-dialog');
const dialogScreen = document.querySelector('#dialog-screen');
let selectedScreen = 'marketplace';
let transition;

// A tab is activated immediately with the keyboard; no automatic cycling.
function enableTabs(tablist, activate) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const select = tab => {
    for (const item of tabs) {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    }
    activate(tab);
  };
  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const current = tabs.indexOf(tab);
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      select(tabs[next]);
    });
  }
  tablist.hidden = false;
}

function showScreen(tab) {
  const name = tab.dataset.screen;
  if (name === selectedScreen) return;
  const next = screens[name];
  selectedScreen = name;
  const update = () => {
    screen.src = next.src;
    screen.alt = next.alt;
    screenLink.href = next.src;
    screenLink.setAttribute('aria-label', `Enlarge the OpenBazaar ${next.title.toLowerCase()} screenshot`);
    caption.textContent = next.caption;
    panel.setAttribute('aria-labelledby', tab.id);
  };
  transition?.skipTransition();
  if (document.startViewTransition && !motion.matches) {
    transition = document.startViewTransition(update);
    transition.finished.catch(() => {});
  } else update();
}

// Load the two alternate captures only when the visitor approaches the preview.
const preload = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  for (const name of ['wallet', 'orders']) {
    const image = new Image();
    image.src = screens[name].src;
  }
  preload.disconnect();
}, { rootMargin: '100px' });
preload.observe(screen);
enableTabs(document.querySelector('.preview-tabs'), showScreen);

if (typeof dialog.showModal === 'function') {
  screenLink.addEventListener('click', event => {
    event.preventDefault();
    const current = screens[selectedScreen];
    dialogScreen.src = current.src;
    dialogScreen.alt = current.alt;
    document.querySelector('#dialog-heading').textContent = `OpenBazaar desktop alpha / ${current.title}`;
    dialog.showModal();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('#nav-links');
const setMenu = open => {
  menuButton.setAttribute('aria-expanded', String(open));
  navLinks.classList.toggle('open', open);
};
menuButton.hidden = false;
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navLinks.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
