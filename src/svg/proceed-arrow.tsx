import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {color, rgba} from '../utils';

export default function PROCEED_ARROW_SVG({disabled = true}) {
  return (
    <Svg width={44} height={44} viewBox="0 0 16 16">
      <Rect width="16" height="16" fill={color['#0C1017']} />
      <Path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        fill={disabled ? rgba['rgba(225, 225, 225, 0.20));'] : color['#FFFFFF']} // Set the fill color for the arrow icon
      />
    </Svg>
  );
}
