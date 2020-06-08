import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

const CheckCircle = props => {
  const {
    label,
    isChecked,
    unCheckedColor,
    checkedColor,
    marginVertical
  } = props;
  return (
    <StyledView {...props} marginVertical={marginVertical} activeOpacity={1}>
      <Icon
        size={30}
        name={isChecked ? 'radio-button-checked' : 'radio-button-unchecked'}
        color={isChecked ? checkedColor : unCheckedColor}
      />
      <Label
        color={COLORS.darkBlueFont}
        content={label}
        marginLeft={SPACING.small}
        typography={TYPOGRAPHY.defaultLabel}
      />
    </StyledView>
  );
};

const StyledView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: ${SPACING.regular}px;
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
`;

CheckCircle.defaultProps = {
  isChecked: false,
  unCheckedColor: COLORS.defaultText,
  checkedColor: COLORS.secondary,
  marginVertical: 0
};

CheckCircle.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  unCheckedColor: PropTypes.string,
  checkedColor: PropTypes.string,
  marginVertical: PropTypes.number
};

export default CheckCircle;
