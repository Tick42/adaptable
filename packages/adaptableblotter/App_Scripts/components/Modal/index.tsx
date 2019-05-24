import * as React from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { useRef, useMemo, useState, MutableRefObject, useLayoutEffect } from 'react';
import join from '../utils/join';
import { RemoveScroll } from 'react-remove-scroll';
import { FlexProps, Flex } from 'rebass';

import {
  baseClassName,
  default as Backdrop,
  TypeBackdropHandle,
  updatePositionInStack,
} from './Backdrop';

const uuidv4 = require('uuid/v4');
const createUuid = (): string => uuidv4();

let portalElement: HTMLElement;
const ensurePortalElement = () => {
  if (!(global as any).document) {
    return;
  }
  if (portalElement) {
    return;
  }

  portalElement = document.createElement('div');

  document.body.appendChild(portalElement);
};

export type ModalProps = React.HTMLProps<HTMLElement> &
  FlexProps & {
    isOpen?: boolean;
    baseZIndex?: number;
  };

const Modal = (props: ModalProps) => {
  ensurePortalElement();

  const { baseZIndex, className, style, children, isOpen, ...boxProps } = props;

  const timestamp = isOpen ? Date.now() : 0;
  const uuid: string = useMemo(() => createUuid(), []);

  const [stackZIndex] = useState<number>(baseZIndex || 1000);

  const backdropHandleRef = useRef<TypeBackdropHandle>(null);

  useLayoutEffect(() => {
    if (!backdropHandleRef.current) {
      return;
    }
    updatePositionInStack(uuid, {
      baseZIndex,
      timestamp,
      setBackdropVisible: backdropHandleRef.current.setBackdropVisible,
    });
  });

  return createPortal(
    isOpen ? (
      <>
        <RemoveScroll>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            {...boxProps}
            style={{ zIndex: stackZIndex, ...style }}
            className={join(baseClassName, className)}
          >
            {children}
          </Flex>
        </RemoveScroll>
        <Backdrop uuid={uuid} handle={backdropHandleRef} baseZIndex={baseZIndex || 1000} />
      </>
    ) : null,
    portalElement
  );
};

export default Modal;
