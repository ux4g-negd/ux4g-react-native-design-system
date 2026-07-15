/**
 * UX4G Design System Icon Foundation Types
 * Provides structure for custom iconography definitions and asset mappings.
 */

export type Ux4gIconName =
  | 'check'
  | 'close'
  | 'search'
  | 'arrow-back'
  | 'arrow-forward'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'calendar'
  | 'time'
  | 'upload'
  | 'download'
  | 'aadhaar'
  | 'pan'
  | 'biometric'
  | string;

export interface Ux4gIconData {
  name: Ux4gIconName;
  size?: number;
  color?: string;
}
