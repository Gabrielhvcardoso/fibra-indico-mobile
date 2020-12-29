import styled from 'styled-components/native';

export const RadioGroupComponent = styled.View``;

export const RadioItemComponent = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  margin: 5px 0px;
`;

interface SelectedProps {
  color: string
}

export const RadioButton = styled.TouchableOpacity<SelectedProps>`
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border: 2px ${props => props.color};
  justify-content: center;
  margin-right: 10px;
`;

export const RadioButtonContent = styled.View<SelectedProps>`
  background-color: ${props => props.color};
  border-radius: 5px;
  width: 10px;
  height: 10px;
`;

export const RadioText = styled.Text`
  color: black;
  font-family: 'WorkSans';
  font-size: 16px;
`;
