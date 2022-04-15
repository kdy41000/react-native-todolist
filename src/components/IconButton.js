import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {icons} from '../icons';

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const IconButton = ({icon, onPress, item}) => {
    const _onPress = () => {
        console.log("클릭",item.id);
        onPress(item.id);
    }
    return (
        <TouchableOpacity onPress={_onPress}>
            <View>
                <Icon source={icon} completed={item.completed} />
            </View>
        </TouchableOpacity>
    );
};

IconButton.defaultProps = {
    item: { completed: false }
}

IconButton.propTypes = {
    icon: PropTypes.oneOf(Object.values(icons)).isRequired,   //무엇들중 하나를 받아야함
    onPress: PropTypes.func,
    item: PropTypes.object

}

export default IconButton;