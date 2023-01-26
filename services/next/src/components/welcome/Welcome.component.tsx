import React from 'react';

interface WelcomeComponentProps {
  description: string;
}
export const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ description }) => {
  return description ? <div>{description}</div> : null;
};
