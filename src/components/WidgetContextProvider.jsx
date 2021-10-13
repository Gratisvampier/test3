import { h, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const defaultSettings = {
  widgetBackgroundColor: 'red',
  widgetButtonColor: 'blue',
  widgetTextColor: '#fff',
  widgetWidth: '200px',
};

export const WidgetContext = createContext({
  settings: defaultSettings,
  widgetContainerWidth: null,
  setWidgetContainerWidth: () => {},
});

export const useWidget = () => useContext(WidgetContext);

export const WidgetContextProvider = ({ children, settings }) => {
  const [widgetContainerWidth, setWidgetContainerWidth] = useState(null);

  return (
    <WidgetContext.Provider
      value={{ settings, widgetContainerWidth, setWidgetContainerWidth }}
    >
      {children}
    </WidgetContext.Provider>
  );
};
