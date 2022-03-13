import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, View, Text, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/colors';
import {AppStyles} from '../../constants/styles';

interface Props {
  label?: string;
  inputType: 'radio' | 'checkbox';
  checked: boolean;
  hasError: boolean;
  handleChange?: (checked: boolean) => void;
  children?: JSX.Element;
  style?: ViewStyle;
}

export const CheckInput = (props: Props) => {
  const [checked, setChecked] = useState(props.checked);

  const onPressed = () => {
    if (props.handleChange) {
      props.handleChange(!checked);
    }
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const getInputIcon = () => {
    if (props.inputType === 'radio') {
      return props.checked ? 'radio-button-checked' : 'radio-button-unchecked';
    } else {
      return props.checked ? 'check-box' : 'check-box-outline-blank';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressed}
      style={{
        ...AppStyles.checkboxRow,
        ...AppStyles.flex1,
        ...props.style,
      }}>
      <Icon
        color={props.hasError ? Colors.red : Colors.primary}
        name={getInputIcon()}
        size={28}
      />
      <View style={AppStyles.flex1}>
        {props.children || <Text>{props.label}</Text>}
      </View>
    </TouchableOpacity>
  );
};
