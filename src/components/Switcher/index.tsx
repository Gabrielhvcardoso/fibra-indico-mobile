import React, { ReactElement, useRef } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

export interface ChildProps {
  moveToIndex?: (index: number) => void
}

interface SwitcherProps {
  scrollEnabled?: boolean,
  children: Array<ReactElement<ChildProps>>
}

const Switcher: React.FC<SwitcherProps> = ({ scrollEnabled = false, children }) => {
  const scrollview = useRef<ScrollView>(null);

  const moveToIndex = (index = 0) => {
    const unit = Dimensions.get('window').width;
    scrollview.current?.scrollTo({ x: index * unit, y: 0, animated: true });
  };

  return (
    <ScrollView
      ref={scrollview}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      pagingEnabled
      style={{ flex: 1 }}
    >
      {
        React.Children.map(children, (child) => (
          <View style={{ width: Dimensions.get('window').width }}>
            {
              React.cloneElement(child, {
                moveToIndex
              })
            }
          </View>
        ))
      }
    </ScrollView>
  );
};

export default Switcher;
