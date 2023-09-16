import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Rect} from 'react-native-svg';

export default function USER_X_SVG() {
  return (
    <Svg width={27} height={26} viewBox="0 0 27 26" fill="none">
      <Rect
        x="22.9779"
        width={4}
        height={32.4957}
        transform="rotate(45 22.9779 0)"
        fill="#2475C5"
      />
      <Rect
        width={4}
        height={32.4957}
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 3.32753 0)"
        fill="#2475C5"
      />
    </Svg>
  );
}
