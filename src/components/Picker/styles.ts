import styled from 'styled-components/native';
import { theme } from '../../theme';

export const PickerButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.w1.hex()};
  border-radius: 4px;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  padding: 10px 15px;
`;

export const PickerButtonText = styled.Text`
  flex: 1;
  font-family: 'WorkSans';
`;

export const Selector = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  background-color: white;
  border-radius: 10px;
  max-height: 60%;
  overflow: hidden;
  padding: 10px 0px;
  width: 80%;
`;

export const SelectorItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 45px;
  padding: 0px 10px;
`;

export const SelectorItemText = styled.Text`
  font-family: 'WorkSans';
`;

export const Backdrop = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
`;
