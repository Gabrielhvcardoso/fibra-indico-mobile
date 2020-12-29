import styled from 'styled-components/native';
import { theme } from '../../theme';

export const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.w3.hex()};
  border-radius: 4px;
  height: 50px;
  justify-content: center;
  padding: 10px 15px;
`;

export const ButtonText = styled.Text`
  font-family: 'WorkSans';
`;
