import * as React from 'react';
import { Box, BoxProps, Flex, FlexProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-Panel';

export interface HeaderProps extends FlexProps {}
export type PanelProps = HTMLProps<HTMLElement> & {
  header?: ReactNode | string;
  headerProps?: HeaderProps;
  bodyProps?: BoxProps;
  variant?: 'default' | 'primary';
  border?: string | number;
  borderRadius?: string | number;
  bodyScroll?: string | boolean;
} & BoxProps;

const Header = ({
  children,
  variant = 'default',
  ...headerProps
}: { variant?: 'default' | 'primary'; children?: ReactNode } & FlexProps) => {
  if (!children) {
    return null;
  }

  const style: { [key: string]: any } = {};

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      fontSize={2}
      {...headerProps}
      style={{ ...style, ...headerProps.style }}
      className={join(`${baseClassName}__header`, `${baseClassName}__header--variant-${variant}`)}
    >
      {children}
    </Flex>
  );
};

const Body = ({
  children,
  bodyScroll,
  ...bodyProps
}: { children?: ReactNode; bodyScroll?: string | boolean } & BoxProps) => {
  if (!children) {
    return null;
  }

  if (bodyScroll === true) {
    bodyScroll = 'auto';
  }

  return (
    <Box
      {...bodyProps}
      className={join(
        `${baseClassName}__body`,
        bodyScroll ? `${baseClassName}__body--scroll-${bodyScroll}` : null
      )}
    >
      {children}
    </Box>
  );
};

const Panel = (props: PanelProps) => {
  const {
    borderRadius,
    border,
    className,
    header,
    children,
    headerProps,
    bodyProps,
    bodyScroll,
    variant = 'default',
    ...boxProps
  } = props;

  const style: { [key: string]: any } = {};

  if (borderRadius !== undefined) {
    style['--ab-cmp-panel__border-radius'] = borderRadius;
  }

  const headerStyle = {
    border,
    ...(headerProps ? headerProps.style : null),
  };
  const bodyStyle = {
    border,
    ...(bodyProps ? bodyProps.style : null),
  };

  return (
    <Box
      {...boxProps}
      style={{ ...style, ...boxProps.style }}
      className={join(
        className,
        baseClassName,
        `${baseClassName}--variant-${variant}`,
        !header ? `${baseClassName}--no-header` : `${baseClassName}--with-header`
      )}
    >
      <Header {...headerProps} style={headerStyle} variant={variant}>
        {header}
      </Header>
      <Body {...bodyProps} style={bodyStyle} bodyScroll={bodyScroll}>
        {children}
      </Body>
    </Box>
  );
};

export default Panel;
