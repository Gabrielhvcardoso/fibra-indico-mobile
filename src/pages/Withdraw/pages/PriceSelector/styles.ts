import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
`;

export const Text = styled.Text`
  font-family: 'WorkSans'
`;

export const PriceInput = styled.TextInput.attrs({
  autoFocus: true
})`
  font-family: 'WorkSans';
  font-size: 60px;
  height: 80px;
`;
