import { buildRefs } from '@/assets/scripts/helpers.js'

export default function (el) {
  const isDesktopMediaQuery = window.matchMedia('(min-width: 1024px)')
  isDesktopMediaQuery.addEventListener('change', onBreakpointChange)

  onBreakpointChange()

  function onBreakpointChange() {
    if (isDesktopMediaQuery.matches) {
      setScrollPaddingTop()
    }
  }

  function setScrollPaddingTop() {
    const scrollPaddingTop = document.getElementById('wpadminbar')
      ? document.getElementById('wpadminbar').offsetHeight
      : 0
    document.documentElement.style.scrollPaddingTop = `${scrollPaddingTop}px`
  }

  const refs = buildRefs(el)
  const collapse = new HSCollapse(document.querySelector('#hs-main-megamenu'));
  console.log('NavigationMain component initialized');

  if (collapse) {
    collapse.on('open', () => {
      const nav = document.querySelector('#NavigationMain');
      if (nav) {
        nav.classList.add('collapse-open');
      }
    });

    collapse.on('close', () => {
      const nav = document.querySelector('#NavigationMain');
      if (nav) {
        nav.classList.remove('collapse-open');
      }
    });
  }
}