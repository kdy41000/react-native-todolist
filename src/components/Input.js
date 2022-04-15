import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';

//현재 기기값에서 -40으로 width에 여백을 준다.
const StyleInput = styled.TextInput.attrs(({theme}) => ({
    placeholderTextColor: theme.main,
}))`
    width: ${({width})=> width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 25px;
    background-color: ${({theme})=> theme.itemBackground};
    color: ${({theme})=> theme.text};
`;

const Input = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur}) => {
    console.log("placeholder:",placeholder);
    //const width = Dimensions.get('window').width;  //현재 기기의 width값을 얻어온다.
    const width = useWindowDimensions().width;  //같은 방법
    return <StyleInput width={width} 
            placeholder={placeholder} 
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            />
}

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired
}

export default Input;