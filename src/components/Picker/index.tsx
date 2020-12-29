import React, { useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import { Backdrop, PickerButton, PickerButtonText, Selector, SelectorItem, SelectorItemText } from './styles';
import CaretDown from 'react-native-bootstrap-icons/icons/caret-down-fill';
import { theme } from '../../theme';
import { StatusBar } from 'expo-status-bar';

interface PickerProps {
  value: string | number;
  onValueChange: (value: string | number) => void,
}

interface PickerItemProps {
  value: string | number,
  label: string,
  onPress?: (value: string | number) => void,
}

const Picker: React.FC<PickerProps> = ({ value, onValueChange, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const open = () => setIsMenuOpen(true);
  const dismiss = () => setIsMenuOpen(false);
  const options = React.Children.map(children, (child: any) => child?.valueOf().props);

  return (
    <>
      <PickerButton onPress={open}>
        <PickerButtonText>{ options ? (options.find(item => item.value === value)?.label ?? 'Selecione') : '' }</PickerButtonText>
        <CaretDown height={10} width={10} fill={theme.b0.hex()} />
      </PickerButton>

      <Modal transparent animationType="fade" visible={isMenuOpen} onRequestClose={dismiss}>
        <Backdrop onPress={dismiss}>
          <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.6)" />
          <Selector>
            <ScrollView removeClippedSubviews>
              {
                React.Children.map(children, (child: any) => (
                  React.cloneElement((child), {
                    onPress: (value: string | number) => {
                      onValueChange(value);
                      dismiss();
                    }
                  })
                ))
              }
            </ScrollView>
          </Selector>
        </Backdrop>
      </Modal>
    </>
  );
};

export const PickerItem: React.FC<PickerItemProps> = ({ value, label, onPress = () => {} }) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <SelectorItem onPress={handlePress}>
      <SelectorItemText numberOfLines={1}>
        { label }
      </SelectorItemText>
    </SelectorItem>
  );
};

export default Picker;
