import { h } from 'preact';
import { setup } from 'goober';

import { WidgetContextProvider } from './components/WidgetContextProvider';
import { WidgetSizer } from './components/WidgetSizer';
import { WidgetContainer } from './components/WidgetContainer';

setup(h, undefined, undefined, (props) => {
  for (let prop in props) {
    if (prop[0] === '$') {
      delete props[prop];
    }
  }
});

export const Widget = ({ settings }) => {
  return (
    <WidgetContextProvider settings={settings}>
      <WidgetSizer>
        <WidgetContainer />
      </WidgetSizer>
    </WidgetContextProvider>
  );
};
