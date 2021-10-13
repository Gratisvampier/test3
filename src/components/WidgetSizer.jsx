import { h } from 'preact';
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { styled, setup, css } from 'goober';

import { useWidget } from './WidgetContextProvider';

export const WidgetSizer = ({ children }) => {
  const widgetContainerRef = useRef(null);
  const { setWidgetContainerWidth, settings } = useWidget();

  useEffect(() => {
    const onResize = () =>
      setWidgetContainerWidth(widgetContainerRef?.current?.offsetWidth ?? 0);

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxWidth = useMemo(() => {
    if (settings?.widgetWidth === 'auto' || settings?.widgetWidth === '100%') {
      return '1024px';
    }

    return settings?.widgetWidth;
  }, [settings]);

  return (
    <div
      ref={widgetContainerRef}
      className={css`
        width: 100%;
        min-width: 200px;
        max-width: ${maxWidth};
      `}
    >
      {children}
    </div>
  );
};
