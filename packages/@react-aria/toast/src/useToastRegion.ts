import {AriaLabelingProps, DOMAttributes} from '@react-types/shared';
// @ts-ignore
import intlMessages from '../intl/*.json';
import {RefObject} from 'react';
import {ToastState} from '@react-stately/toast';
import {useFocusWithin, useHover} from '@react-aria/interactions';
import {useLandmark} from '@react-aria/landmark';
import {useLocalizedStringFormatter} from '@react-aria/i18n';

export interface AriaToastRegionProps extends AriaLabelingProps {}
export interface ToastRegionAria {
  regionProps: DOMAttributes
}

export function useToastRegion<T>(props: AriaToastRegionProps, state: ToastState<T>, ref: RefObject<HTMLElement>): ToastRegionAria {
  let stringFormatter = useLocalizedStringFormatter(intlMessages);
  let {landmarkProps} = useLandmark({
    role: 'region',
    'aria-label': props['aria-label'] || stringFormatter.format('notifications')
  }, ref);

  let {hoverProps} = useHover({
    onHoverStart: state.pauseAll,
    onHoverEnd: state.resumeAll
  });

  let {focusWithinProps} = useFocusWithin({
    onFocusWithin: state.pauseAll,
    onBlurWithin: state.resumeAll
  });

  return {
    regionProps: {
      ...landmarkProps,
      ...hoverProps,
      ...focusWithinProps
    }
  };
}
