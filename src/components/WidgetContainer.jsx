import { h, Fragment } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';
import { styled, setup, css } from 'goober';

import { useWidget } from './WidgetContextProvider';
import { DateInput, DateInputContainer } from './DateInput';
import { invertColor } from '../helpers/invertColor';

const Container = styled('div')`
  padding: ${({ $containerPadding }) => $containerPadding};
  background-color: ${({ $bgColor }) => $bgColor};

  &,
  * {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Open Sans,
      Helvetica Neue, sans-serif;
    box-sizing: border-box;
  }
`;
const Title = styled('div')`
  font-size: ${({ $fontSize }) => $fontSize}px;
  color: ${({ $color }) => $color};
`;
const Content = styled('div')`
  display: flex;
  margin-top: ${({ $sizes: { S } }) => (S ? 0 : '12px')};
  flex-direction: ${({ $sizes: { XL, L } }) => (XL || L ? 'row' : 'column')};
  flex-wrap: ${({ $sizes: { L } }) => (L ? 'wrap' : 'nowrap')};
`;
const ActionsContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: ${({ $sizes: { S } }) => (S ? 'column' : 'row')};
  margin-top: ${({ $sizes: { XL } }) => (XL ? 0 : '15px')};
  margin-left: ${({ $sizes: { XL } }) => (XL ? 'auto' : 0)};
  max-width: ${({ $sizes: { XL } }) => (XL ? '640px' : '100%')};
  flex-wrap: ${({ $sizes: { M } }) => (M ? 'wrap' : 'nowrap')};
`;
const InputsContainer = styled('div')`
  display: flex;
  flex-direction: ${({ $sizes: { S } }) => (S ? 'column' : 'row')};
  width: ${({ $sizes: { L } }) => (L ? '66.666666%' : '100%')};
  flex-shrink: ${({ $sizes: { L } }) => (L ? 0 : 1)};

  ${DateInputContainer} {
    width: ${({ $sizes: { M } }) => (M ? '50%' : '100%')};

    ${({ $sizes: { M } }) =>
      M
        ? `
          min-width: 190px;
        `
        : ''}
    ${({ $sizes: { S } }) =>
      S
        ? `
          min-width: 160px;
        `
        : ''}

    &:not(:last-child) {
      margin-right: ${({ $sizes: { S } }) => (S ? 0 : '20px')};
      margin-bottom: ${({ $sizes: { S } }) => (S ? '15px' : 0)};
    }
  }
`;
const ContentDescription = styled('div')`
  font-size: 10px;
  color: ${({ $color }) => $color};
  min-width: ${({ $sizes: { XL, L } }) => (XL || L ? '240px' : '100%')};
  margin-right: ${({ $sizes: { XL } }) => (XL ? '30px' : 0)};
  margin-top: ${({ $sizes: { S } }) => (S ? '15px' : 0)};
`;
const WidgetButton = styled('button')`
  height: 40px;
  text-transform: uppercase;
  min-width: 200px;
  width: 100%;
  box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  font-size: 20px;
  line-height: 40px;
  border: none;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  margin-left: ${({ $sizes: { XL, L } }) => (XL || L ? '20px' : 0)};

  ${({ $sizes: { M } }) =>
    M
      ? `
        margin-top: 20px;

      `
      : ''}
  ${({ $sizes: { S } }) =>
    S
      ? `
        margin-top: 15px;
        min-width: 160px;
      `
      : ''}
`;

export function WidgetContainer() {
  const { widgetContainerWidth: width, settings } = useWidget();

  const sizes = useMemo(
    () => ({
      XL: width >= 950,
      L: width >= 680 && width < 950,
      M: width >= 440 && width < 680,
      S: width < 440,
    }),
    [width]
  );
  const { XL, L, M, S } = sizes;

  const titleFontSize = XL || L ? 24 : 18;
  const containerPadding = XL || L ? '2px 20px 15px' : '10px 20px 15px';

  const renderDescription = () => (
    <ContentDescription $color={settings?.widgetTextColor} $sizes={sizes}>
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout.
    </ContentDescription>
  );

  const renderContent = () => (
    <Content $sizes={sizes}>
      {!S && renderDescription()}

      <ActionsContainer $sizes={sizes}>
        <InputsContainer $sizes={sizes}>
          <DateInput paceholder="Depart date" />

          <DateInput paceholder="Return date" />
        </InputsContainer>

        <WidgetButton
          $bgColor={settings?.widgetButtonColor}
          $color={invertColor(settings?.widgetButtonColor ?? '#000')}
          $sizes={sizes}
        >
          Search
        </WidgetButton>
      </ActionsContainer>

      {S && renderDescription()}
    </Content>
  );

  return (
    <Container
      $containerPadding={containerPadding}
      $bgColor={settings?.widgetBackgroundColor}
    >
      <Title $fontSize={titleFontSize} $color={settings?.widgetTextColor}>
        Where does it come from? Why do we use it?
      </Title>

      {renderContent()}
    </Container>
  );
}
