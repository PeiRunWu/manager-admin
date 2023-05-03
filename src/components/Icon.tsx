import * as AllIcons from '@ant-design/icons';
import React from 'react';

interface IconProps {
  name: keyof typeof AllIcons ;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = AllIcons[name] as React.ComponentType<any>;
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default Icon;
