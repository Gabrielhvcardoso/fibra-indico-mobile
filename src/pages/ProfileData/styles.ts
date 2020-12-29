import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 15 }
})`
  background-color: white;
  flex: 1;
`;

export const Label = styled.Text`
  font-family: 'WorkSans';
  margin-top: 10px;
`;
