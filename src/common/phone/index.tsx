import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {AppStyles} from '../../constants/styles';
import {Style} from './styles';

interface Props {
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
  validate: boolean;
}

export default function PhoneNumberInput(props: Props) {
  const getValue = (text: string) => {
    return text.substring(4);
  };

  const [value, setValue] = useState(getValue(props.value));

  useEffect(() => {
    setValue(getValue(props.value));
  }, [props.value]);

  const handleValueChange = (text: string) => {
    props.onChangeText(`+254${text}`);
  };

  return (
    <View style={{...AppStyles.rowFlex, ...AppStyles.alignCenter}}>
      <Text style={{...Style.label, ...Style.prefix}}>+254</Text>
      <TextInput
        placeholder="xxx xxx xxx"
        style={{
          ...AppStyles.textInput,
          ...AppStyles.flex1,
          ...Style.suffix,
          ...(value === '' && props.validate ? AppStyles.errorTextInput : {}),
        }}
        onChangeText={handleValueChange}
        value={value}
        keyboardType="phone-pad"
      />
    </View>
  );
}
