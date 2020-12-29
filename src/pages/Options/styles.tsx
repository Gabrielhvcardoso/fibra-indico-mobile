import React from 'react';
import { TouchableOpacityProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import CaretRight from 'react-native-bootstrap-icons/icons/caret-right';
import { theme } from '../../theme';

export const Container = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

export const Text = styled.Text`
  font-family: 'WorkSans';
`;

const MenuItemContainer = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  flex-direction: row;
  margin: 0px 15px;
  padding: 10px 10px;
`;

const MenuItemText = styled.Text`
  font-family: 'WorkSans';
  font-size: 17px;
  flex: 1;
  margin-bottom: 2px;
`;

interface Props extends TouchableOpacityProps {
  icon?: React.FC<ViewProps>
}

export const MenuItem: React.FC <Props> = (props) => (
  <MenuItemContainer {...props}>
    {
      props.icon && (
        <props.icon style={{ marginRight: 20 }} />
      )
    }
    <MenuItemText>
      { props.children }
    </MenuItemText>

    <CaretRight width={10} height={10} fill={theme.b9.hex()} />
  </MenuItemContainer>
);

export const ProfileContainer = styled.TouchableOpacity`
  border-bottom-width: 0.5px;
  border-bottom-color: ${theme.w6.hex()};
  margin: 15px;
  padding: 0px 15px 15px;
`;
