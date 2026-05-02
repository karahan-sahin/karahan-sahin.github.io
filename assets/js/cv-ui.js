(function () {
  const content = document.getElementById('cv-content');
  const toc = document.getElementById('toc-nav');
  const toggle = document.getElementById('toc-toggle');

  if (!content || !toc) return;

  const headings = Array.from(content.querySelectorAll('h2'));
  if (!headings.length) return;

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

  headings.forEach((heading) => {
    if (!heading.id) heading.id = slugify(heading.textContent || 'section');

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent || 'Section';
    toc.appendChild(link);
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = toc.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const links = Array.from(toc.querySelectorAll('a'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  headings.forEach((heading) => observer.observe(heading));
})();
