import styled from 'styled-components/native';
import { theme } from '../../theme';

const TextInput = styled.TextInput`
  background-color: ${theme.w1.hex()};
  border-radius: 4px;
  font-family: 'WorkSans';
  height: 50px;
  padding: 10px 15px;
`;

export default TextInput;
