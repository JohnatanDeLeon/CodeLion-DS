import { animation } from "../tokens/effects.css";

/**
 * transition utility to centralize duration and easing tokens
 */
export const transition = ({
  properties = ["all"],
  duration = animation.duration.normal,
  easing = animation.easing.easeOut,
}: {
  properties?: string[];
  duration?: string;
  easing?: string;
} = {}) => {
  return {
    transition: `${properties.join(", ")} ${duration} ${easing}`,
  } as const;
};
