import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonContainer, ButtonText } from './styles';

interface Props extends TouchableOpacityProps {}

const Button: React.FC<Props> = (props) => {
  return (
    <ButtonContainer {...props} >
      <ButtonText>
        { props.children }
      </ButtonText>
    </ButtonContainer>
  );
};

export default Button;
