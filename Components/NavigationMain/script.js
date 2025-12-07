import { buildRefs } from '@/assets/scripts/helpers.js'
import { HSCollapse } from 'preline'

export default function (el) {
  const refs = buildRefs(el, true)

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

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('hs.collapse.init', () => {
      const collapse = HSCollapse.getInstance('#hs-main-megamenu-collapse');

      if (!collapse) return;

      collapse.element.on('open', () => {
        document.querySelector('#NavigationMain')?.classList.add('collapse-open');
      });

      collapse.element.on('hide', () => {
        document.querySelector('#NavigationMain')?.classList.remove('collapse-open');
      });
    });
  });

  function initDoubleTapDropdown() {
    const triggers = refs.dropdownToggle
    const isMobile = () => window.innerWidth < 1024

    triggers?.forEach(btn => {
      let tappedOnce = false
      const link = btn.dataset.link

      btn.addEventListener('click', e => {
        if (!isMobile()) {
          if (link) window.location.href = link
          return
        }

        if (!tappedOnce) {
          tappedOnce = true
          setTimeout(() => tappedOnce = false, 600)
          return
        }

        tappedOnce = false
        if (link) window.location.href = link
      })
    })
  }

  initDoubleTapDropdown()

}
