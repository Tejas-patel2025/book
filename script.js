// Preload Images
function preloadImg(url) {
    new Image().src = url;
}
['illustration-features-tab-1.svg', 'illustration-features-tab-2.svg', 'illustration-features-tab-3.svg']
    .forEach(preloadImg);

// DOM Elements
const DOM = {
    body: document.querySelector('body'),
    header: document.querySelector('.header'),
    menuBtn: document.querySelector('.menu-btn'),
    featureSection: document.querySelector('.feature'),
    tabs: document.querySelector('.tabs'),
    featureHeading: document.querySelector('.feature__heading'),
    featureDescription: document.querySelector('.feature__description'),
    featureImg: document.querySelector('.feature__img'),
    loginBtn: document.querySelector('.header__nav__link--login'),
    btns: document.querySelectorAll('.btn'),
    attribution: document.querySelector('.attribution'),
    attributionImg: document.querySelector('.attribution__img')
};

// Audio Elements
const audio = {
    pop: new Audio('./audio/pop.mp3'),
    whoosh: new Audio('./audio/whoosh.mp3')
};

// Feature Data
const features = [
    {
        heading: 'Bookmark in one click',
        description: 'Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.',
        imgPath: 'illustration-features-tab-1.svg',
        altText: 'dashboard'
    },
    {
        heading: 'Intelligent search',
        description: 'Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.',
        imgPath: 'illustration-features-tab-2.svg',
        altText: 'dashboard with magnifying glass'
    },
    {
        heading: 'Share your bookmarks',
        description: 'Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.',
        imgPath: 'illustration-features-tab-3.svg',
        altText: 'people waving to each other'
    }
];

// Mobile Navigation
function toggleMobileNav() {
    DOM.header.classList.toggle('mobile-nav--active');
    DOM.body.classList.toggle('disable-scroll');
}

DOM.menuBtn.addEventListener('click', toggleMobileNav);

// Feature Tabs
function changeTab(index) {
    DOM.featureSection.classList.add('fade-out');
    setTimeout(() => {
        DOM.featureHeading.textContent = features[index].heading;
        DOM.featureDescription.textContent = features[index].description;
        DOM.featureImg.src = features[index].imgPath;
        DOM.featureImg.alt = features[index].altText;
        DOM.featureSection.classList.remove('fade-out');
    }, 300);
}

function handleTabChange(e) {
    if (!e.target.classList.contains('tabs__tab')) return;

    DOM.tabs.querySelectorAll('.tabs__tab').forEach(tab => tab.classList.remove('tabs__tab--active'));
    e.target.classList.add('tabs__tab--active');

    const tabIndex = { 'tab-1': 0, 'tab-2': 1, 'tab-3': 2 }[e.target.id];
    if (tabIndex !== undefined) changeTab(tabIndex);
}

DOM.tabs.addEventListener('click', handleTabChange);
DOM.tabs.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('tabs__tab')) {
        handleTabChange(e);
    }
});

// Tab Persistence on Visibility Change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    const activeTab = DOM.tabs.querySelector('.tabs__tab--active');
    if (activeTab) {
        const tabIndex = { 'tab-1': 0, 'tab-2': 1, 'tab-3': 2 }[activeTab.id];
        if (tabIndex !== undefined) changeTab(tabIndex);
    }
});

// Ripple Effect
function addRippleEffect(el) {
    el.addEventListener('click', (e) => {
        const { left, top } = e.target.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${e.clientX - left}px`;
        ripple.style.top = `${e.clientY - top}px`;
        e.target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });
}

[DOM.loginBtn, ...DOM.btns].forEach(addRippleEffect);

// Attribution Toggle
DOM.attributionImg.addEventListener('click', () => {
    DOM.attribution.classList.toggle('attribution-active');
    audio[DOM.attribution.classList.contains('attribution-active') ? 'whoosh' : 'pop'].play();
});