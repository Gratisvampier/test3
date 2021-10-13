import { render, h } from 'preact';
import { Widget } from './Widget';

const renderWidget = (parent, settings = {}) =>
  render(
    h(() => Widget({ settings })),
    parent
  );

window.addEventListener('DOMContentLoaded', () => {
  const widgets = document.querySelectorAll('div[class^="widget-app-"]');

  widgets.forEach((item) => {
    renderWidget(item, {
      ...item.dataset,
    });
  });
});
