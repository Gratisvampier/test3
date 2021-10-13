import { h } from 'preact';
import { styled } from 'goober';
import { CalendarIcon } from './CalendarIcon';

export const DateInputContainer = styled('div')`
  min-width: 200px;
  width: 100%;
  position: relative;
`;
const Input = styled('input')`
  height: 40px;
  background: #ffffff;
  border-radius: 2px;
  font-size: 14px;
  line-height: 40px;
  border: none;
  color: #111;
  width: 100%;
  padding: 0 35px 0 10px;

  ::placeholder {
    color: #9b9b9b;
  }
`;
const IconContainer = styled('div')`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const DateInput = ({ paceholder }) => {
  return (
    <DateInputContainer>
      <Input type="text" placeholder={paceholder} />

      <IconContainer>
        <CalendarIcon />
      </IconContainer>
    </DateInputContainer>
  );
};
