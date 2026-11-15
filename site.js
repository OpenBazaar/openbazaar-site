const motion = matchMedia('(prefers-reduced-motion: reduce)');
const screens = {
  marketplace: {
    src: 'assets/marketplace.jpg',
    alt: 'OpenBazaar desktop alpha: product search, independent stores, and a catalog of home goods on testnet4.',
    caption: 'Browse goods from independent stores.',
    title: 'Marketplace',
  },
  wallet: {
    src: 'assets/wallet.jpg',
    alt: 'OpenBazaar desktop alpha: the node wallet with spendable and pending testnet4 balances and a receive address.',
    caption: 'Manage the wallet on your own node.',
    title: 'Node wallet',
  },
  orders: {
    src: 'assets/orders.jpg',
    alt: 'OpenBazaar desktop alpha: a demo order awaiting payment, with node-wallet and external-wallet payment options.',
    caption: 'One seller. One order. One direct payment.',
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

const flows = {
  catalog: {
    protocol: 'BIP 340 / SHA-256',
    title: 'Verify the seller, not the server.',
    description: 'Your node checks store and listing signatures. A listing’s content hash identifies the exact version an order refers to. A valid signature proves authorship and integrity; it does not prove freshness, availability, or an honest seller.',
    accessible: 'A buyer’s app talks to its own node. The buyer’s node retrieves a signed catalog from a seller’s node over Tor.',
  },
  order: {
    protocol: 'SEALED ORDER / TOR',
    title: 'Address the order to one vendor.',
    description: 'The order names the signed listing version and carries the purchase terms. It is sealed to the vendor and delivered through the node’s Tor client. Public catalog records exclude shipping details; the vendor needs those details to fulfill a physical order.',
    accessible: 'The buyer’s node seals an order to the seller and sends it through Tor to the seller’s node. The seller receives the order details.',
  },
  payment: {
    protocol: 'BITCOIN / DIRECT PAY',
    title: 'Pay the seller, without platform custody.',
    description: 'The seller’s node supplies a fresh Bitcoin receive address for the order. The buyer pays from its node wallet or an external wallet. Bitcoin settles on its own network, not through Tor. Direct pay offers no escrow protection; moderated escrow is a separate testnet4 protocol.',
    accessible: 'The buyer pays the seller’s order-specific Bitcoin address using the Bitcoin network. The Tor connection exchanges order information; it does not settle the payment.',
  },
};

const flowPanel = document.querySelector('#flow-panel');
enableTabs(document.querySelector('.flow-tabs'), tab => {
  const name = tab.dataset.flow;
  const flow = flows[name];
  flowPanel.dataset.stage = name;
  flowPanel.setAttribute('aria-labelledby', tab.id);
  document.querySelector('#flow-protocol').textContent = flow.protocol;
  document.querySelector('#flow-heading').textContent = flow.title;
  document.querySelector('#flow-description').textContent = flow.description;
  document.querySelector('.diagram').setAttribute('aria-label', flow.accessible);
  // The settlement view labels the network explicitly, rather than implying
  // that Bitcoin itself is transported by the order's Tor channel.
  document.querySelector('.transport-label').textContent = name === 'payment' ? 'BITCOIN' : 'TOR';
  document.querySelector('.transport-small').textContent = name === 'payment' ? 'direct settlement' : 'onion service';
  document.querySelector('.mobile-transport').textContent = name === 'payment' ? 'Bitcoin / direct settlement ↓' : 'Tor onion service ↓';
});
