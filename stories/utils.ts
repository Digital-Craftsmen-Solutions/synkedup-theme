/// <reference path="./vite-env.d.ts" />
import twig from "twig"

twig.extendFilter('e', (value, args) => {
  const strategy = args?.[0] ?? 'html';
  return String(value);
});
twig.extendFilter('resizeDynamic', (value, args) => {
  return value;
});

twig.extendFunction("placeholderImage", function (value, times) {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwMCcgaGVpZ2h0PScyNjY4JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPSc0MDAwJyBoZWlnaHQ9JzI2NjgnIHN0eWxlPSdmaWxsOnJnYmEoMTI1LCAxMjUsIDEyNSwgMC4xKScgLz48L3N2Zz4='
});

export const renderTwig = (path: string) => {
  return twig.twig({
    async: false,
    href: path,
    namespaces: { 'Components': '../../Components' }
  })
}
