import { buildRefs } from '@/assets/scripts/helpers.js'
import { HSCollapse } from 'preline'

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

  const collapse = HSCollapse.getInstance('#hs-main-megamenu-collapse', true)
  if (!collapse) {
    console.warn('Collapse not initialized yet')
    return
  }
  console.log(collapse);
  if (collapse) {
    collapse.element.on('open', () => {
      document.querySelector('#NavigationMain')?.classList.add('collapse-open')
    });

    collapse.element.on('hide', () => {
      document.querySelector('#NavigationMain')?.classList.remove('collapse-open')
    });
  }

}
