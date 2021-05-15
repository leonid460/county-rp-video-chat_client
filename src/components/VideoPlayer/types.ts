import { MutableRefObject } from 'react';

export interface IVideoPlayerProps {
  video?: MutableRefObject<HTMLVideoElement | null>;
  className?: string;
}
