import React, { ReactElement } from 'react';
import { ViewProps } from 'react-native';
import { RadioGroupComponent, RadioItemComponent, RadioButton, RadioButtonContent, RadioText } from './styles';

interface RadioGroupProps extends ViewProps {
  value: string | number,
  color?: string;
  onValueChange: (value: string | number) => void,
  children: Array<ReactElement<any | RadioGroupProps>>
}

interface RadioItemProps {
  color?: string;
  disabled?: boolean;
  value: string | number,
  selectedValue?: string | number,
  onValueChange?: (value: string | number) => void
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const mainColor = props.color || '#2b7ed7';

  return (
    <RadioGroupComponent {...props}>
      {
        React.Children.map(props.children, (child) => (
          React.cloneElement(child, {
            color: mainColor,
            selectedValue: props.value,
            onValueChange: props.onValueChange
          })
        ))
      }
    </RadioGroupComponent>
  );
};

export const RadioItem: React.FC<RadioItemProps> = ({ disabled, color, value, selectedValue, onValueChange, children }) => {
  const selected = selectedValue === value;

  return (
    <RadioItemComponent
      disabled={disabled}
      onPress={() => onValueChange ? onValueChange(value) : null}
    >
      <RadioButton color={selected ? (color ?? '#2b7ed7') : 'grey'}>
        <RadioButtonContent color={selected ? (color ?? '#2b7ed7') : 'transparent'} />
      </RadioButton>
      <RadioText style={disabled && { color: 'grey' }}>
        { children }
      </RadioText>
    </RadioItemComponent>
  );
};

export default RadioGroup;
