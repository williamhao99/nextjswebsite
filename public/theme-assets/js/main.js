var html = document.documentElement;
var body = document.body;
var timeout;
var st = 0;

featured();
darkPage();
footerGroup();

// Call the function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupFootnotes();
    });
} else {
    setupFootnotes();
}

pagination();

function portalButton() {
    'use strict';
    st = window.scrollY;

    if (st > 300) {
        body.classList.add('portal-visible');
    } else {
        body.classList.remove('portal-visible');
    }
}

function featured() {
    'use strict';
    var feed = document.querySelector('.featured-feed');
    if (!feed) return;

    tns({
        container: feed,
        controlsText: [
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.547 22.107L14.44 16l6.107-6.12L18.667 8l-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M11.453 22.107L17.56 16l-6.107-6.12L13.333 8l8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        gutter: 1,
        loop: false,
        nav: false,
        mouseDrag: true,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}

function darkPage() {
    var isDark = body.classList.contains('tag-hash-dark') ? 'dark' : 'light';
    html.classList.add(`${isDark}-page`);
}

function footerGroup() {
    const footerNav = document.querySelector(".footer-nav");
    const items = document.querySelectorAll(".footer-nav .nav li");

    if (!footerNav || !items.length) return;

    const groups = [];
    let index = null;

    // Process all items first
    items.forEach(item => {
        const text = item.textContent.trim();
        const PREFIXFOOTERHEADER = "#";
        if (text.includes(PREFIXFOOTERHEADER)) {
            index = index === null ? 0 : ++index;
            groups[index] = { header: "", items: [] };
            groups[index].header = text.slice(PREFIXFOOTERHEADER.length);
        } else if (index !== null) {
            const link = item.querySelector('a');
            if (link) {
                groups[index].items.push({ text, link: link.href });
            }
        }
    });

    // Only proceed if we found groups
    if (groups.length === 0) return;

    // Create the new structure
    groups.forEach((group) => {
        const div = document.createElement('div');
        div.classList.add("footer-nav-group");
        const h6 = document.createElement('h6');
        h6.classList.add("footer-group-header", "section-title");
        h6.innerHTML = group.header;
        const ul = document.createElement("ul");
        ul.classList.add("nav");
        group.items.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${item.link}">${item.text}</a>`;
            ul.append(li);
        });
        div.append(h6, ul);
        footerNav.appendChild(div);
    });

    // Remove the old nav if we have new content
    if (groups.length > 0) {
        const oldNav = document.querySelector(".footer-nav ul.nav");
        if (oldNav && oldNav.parentNode) {  // Check if element exists and has a parent
            oldNav.remove();
        }
    }
}

function setupFootnotes() {
    'use strict';
    const contentSelector = 'article.site-content';
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    let htmlContent = contentElement.innerHTML;
    const regexPattern = /\[\^(.*?)\]/g;

    // Check if there are any footnotes before proceeding
    const matches = htmlContent.match(regexPattern);
    if (!matches) return;

    const footnoteList = document.createElement('ol');
    footnoteList.classList.add('footnote-list');
    footnoteList.id = 'footnotes';

    const footnoteWrapper = document.createElement('div');
    footnoteWrapper.classList.add('kg-canvas', 'section-footnotes');

    let index = 1;

    htmlContent = htmlContent.replace(regexPattern, (match, p1) => {
        footnoteList.innerHTML = footnoteList.innerHTML + `<li id="footnote-${index}">${p1}</li>`;
        const returnValue = `<sup class="footnote"><a href="#footnote-${index}">[${index}]</a></sup>`;
        index++;
        return returnValue;
    });

    contentElement.innerHTML = htmlContent;

    footnoteWrapper.appendChild(footnoteList);
    contentElement.appendChild(footnoteWrapper);
}
