import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

const DivisorLine = ({ label, marginVertical, thickness, color }) => (
  <StyledContainer marginVertical={marginVertical}>
    {label === '' ? (
      <StyledDivisorLine thickness={thickness} flexGrow={0} color={color} />
    ) : (
      <StyledDivisorLineWithLabel>
        <StyledDivisorLine thickness={thickness} flexGrow={1} color={color} />
        <Label
          content={label}
          typography={TYPOGRAPHY.smallLabelBold}
          marginRight={SPACING.small}
          marginLeft={SPACING.small}
          color={COLORS.secondary}
        />
        <StyledDivisorLine thickness={thickness} flexGrow={1} color={color} />
      </StyledDivisorLineWithLabel>
    )}
  </StyledContainer>
);

const StyledContainer = styled.View`
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
`;

const StyledDivisorLine = styled.View`
  flex-grow: ${({ flexGrow }) => flexGrow};
  height: ${({ thickness }) => thickness}px;
  background-color: ${({ color }) => color};
`;

const StyledDivisorLineWithLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

DivisorLine.defaultProps = {
  marginVertical: 0,
  color: COLORS.defaultGray,
  thickness: 1,
  label: ''
};

DivisorLine.propTypes = {
  marginVertical: PropTypes.number,
  color: PropTypes.string,
  thickness: PropTypes.number,
  label: PropTypes.string
};

export default DivisorLine;
