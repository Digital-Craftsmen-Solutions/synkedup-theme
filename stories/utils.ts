import twig from "twig"

twig.extendFilter('e', (value, args) => {
  const strategy = args?.[0] ?? 'html';
  return String(value);
});
twig.extendFilter('resizeDynamic', (value, args) => {
  return value;
});

twig.extendFunction("placeholderImage", function (value, times) {
  return ''
});

export const renderTwig = (path: string) => {
  return twig.twig({
    async: false,
    href: path,
    namespaces: { 'Components': '../../Components' }
  })
}
