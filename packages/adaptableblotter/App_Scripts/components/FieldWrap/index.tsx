import styled from 'styled-components';
import { Flex } from 'rebass';

export default styled(Flex)({
  border: '1px solid var(--ab-color-inputborder)',
  borderRadius: 'var(--ab-space-1)',
  overflow: 'hidden',
  '&:focus-within': {
    outline: 'var(--ab-focus__outline)',
  },
  '& input, & select, & > *': {
    border: 'none',
    flex: 1,
    outline: 'none',
  },
});
