/**
 * UX4G Design System Color Tokens & Semantic Theme Palette
 * Direct port of the UX4G Flutter design system colors (`colors.dart`).
 */

export const Ux4gPalette = {
  // Legacy gray aliases
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray800: '#333333',
  gray900: '#121212',

  // Primary
  primary: '#4A2BC2',
  primary50: '#F2EFFF',
  primary100: '#DCD4FF',
  primary200: '#C0B3FF',
  primary300: '#A391FF',
  primary400: '#8670FF',
  primary500: '#6A4EFF',
  primary600: '#4A2BC2',
  primary700: '#3D239F',
  primary800: '#301C7D',
  primary900: '#24145C',
  primary950: '#1A0E3D',
  // Primary Alpha (25% opacity - #RRGGBBAA format for React Native)
  primary50A: '#F2EFFF40',
  primary100A: '#DCD4FF40',
  primary200A: '#C0B3FF40',
  primary300A: '#A391FF40',
  primary400A: '#8670FF40',
  primary500A: '#6A4EFF40',
  primary600A: '#4A2BC240',
  primary700A: '#3D239F40',
  primary800A: '#301C7D40',
  primary900A: '#24145C40',
  primary950A: '#1A0E3D40',

  // Secondary
  secondary: '#A46800',
  secondary50: '#FFF5EA',
  secondary100: '#FFEBD6',
  secondary200: '#FFD9AF',
  secondary300: '#FFBE6F',
  secondary400: '#E89C30',
  secondary500: '#C47D00',
  secondary600: '#A46800',
  secondary700: '#764A00',
  secondary800: '#4B2D00',
  secondary900: '#281600',
  secondary950: '#110700',
  // Secondary Alpha (25% opacity)
  secondary50A: '#FFF5EA40',
  secondary100A: '#FFEBD640',
  secondary200A: '#FFD9AF40',
  secondary300A: '#FFBE6F40',
  secondary400A: '#E89C3040',
  secondary500A: '#C47D0040',
  secondary600A: '#A4680040',
  secondary700A: '#764A0040',
  secondary800A: '#4B2D0040',
  secondary900A: '#28160040',
  secondary950A: '#11070040',

  // Tertiary
  tertiary: '#8E55B3',
  tertiary50: '#F6EFFB',
  tertiary100: '#E9DAF3',
  tertiary200: '#D9BFEA',
  tertiary300: '#C8A3E0',
  tertiary400: '#B686D6',
  tertiary500: '#A66ACC',
  tertiary600: '#8E55B3',
  tertiary700: '#75419A',
  tertiary800: '#5D2F80',
  tertiary900: '#462166',
  tertiary950: '#32174A',
  // Tertiary Alpha (25% opacity)
  tertiary50A: '#F6EFFB40',
  tertiary100A: '#E9DAF340',
  tertiary200A: '#D9BFEA40',
  tertiary300A: '#C8A3E040',
  tertiary400A: '#B686D640',
  tertiary500A: '#A66ACC40',
  tertiary600A: '#8E55B340',
  tertiary700A: '#75419A40',
  tertiary800A: '#5D2F8040',
  tertiary900A: '#46216640',
  tertiary950A: '#32174A40',

  // Neutral
  neutral0: '#FFFFFF',
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#E5E5E5',
  neutral300: '#D9D9D9',
  neutral400: '#A1A1A1',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0A0A0A',
  neutral1000black: '#000000',
  // Neutral Alpha (25% opacity)
  neutral0A: '#FFFFFF40',
  neutral50A: '#FAFAFA40',
  neutral100A: '#F5F5F540',
  neutral200A: '#E5E5E540',
  neutral300A: '#D9D9D940',
  neutral400A: '#A1A1A140',
  neutral500A: '#73737340',
  neutral600A: '#52525240',
  neutral700A: '#40404040',
  neutral800A: '#26262640',
  neutral900A: '#17171740',
  neutral950A: '#0A0A0A40',
  neutral1000A: '#00000040',
  // Neutral Beta (70% opacity)
  neutral0B: '#FFFFFFB3',
  neutral950B: '#0A0A0AB3',

  // Red
  red: '#DB372D',
  red50: '#FFF8F8',
  red100: '#FFECEE',
  red200: '#FFDADC',
  red300: '#FFB3AE',
  red400: '#FF8983',
  red500: '#F55E57',
  red600: '#DB372D',
  red700: '#B3251E',
  red800: '#8A1A16',
  red900: '#60150F',
  red950: '#3A0907',

  // Blue
  blue: '#3271EA',
  blue50: '#F5FAFF',
  blue100: '#E7F2FF',
  blue200: '#D0E4FF',
  blue300: '#A1C9FF',
  blue400: '#76ACFF',
  blue500: '#4E8FF8',
  blue600: '#3271EA',
  blue700: '#1157CE',
  blue800: '#04409F',
  blue900: '#012C6F',
  blue950: '#001944',

  // Sky Blue
  skyBlue: '#0081A8',
  skyBlue50: '#F4FAFF',
  skyBlue100: '#E0F4FF',
  skyBlue200: '#BDE9FF',
  skyBlue300: '#67D4FF',
  skyBlue400: '#00BBEA',
  skyBlue500: '#009DC9',
  skyBlue600: '#0081A8',
  skyBlue700: '#006788',
  skyBlue800: '#004D68',
  skyBlue900: '#003549',
  skyBlue950: '#001F2D',

  // Cyan
  cyan: '#13C2C2',
  cyan50: '#E6FFFB',
  cyan100: '#C9F7F2',
  cyan200: '#ADF0E9',
  cyan300: '#91E8E0',
  cyan400: '#75E0D7',
  cyan500: '#59D8CE',
  cyan600: '#13C2C2',
  cyan700: '#08979C',
  cyan800: '#006D75',
  cyan900: '#00474F',
  cyan950: '#002329',

  // Green
  green: '#128937',
  green50: '#F2FCEF',
  green100: '#DDF8D8',
  green200: '#BEEFBB',
  green300: '#80DA88',
  green400: '#44C265',
  green500: '#1AA64A',
  green600: '#128937',
  green700: '#006C35',
  green800: '#00522C',
  green900: '#00381F',
  green950: '#002110',

  // Lime
  lime: '#A0D911',
  lime50: '#FCFFE6',
  lime100: '#F2FFBF',
  lime200: '#E8FF99',
  lime300: '#DEFF73',
  lime400: '#D4F24D',
  lime500: '#CAE827',
  lime600: '#A0D911',
  lime700: '#7CB305',
  lime800: '#5B8C00',
  lime900: '#3F6600',
  lime950: '#254000',

  // Yellow
  yellow: '#FADB14',
  yellow50: '#FEFFE6',
  yellow100: '#FFFBC2',
  yellow200: '#FFF29C',
  yellow300: '#FFE976',
  yellow400: '#FFE050',
  yellow500: '#FFD72A',
  yellow600: '#FADB14',
  yellow700: '#D4B106',
  yellow800: '#AD8B00',
  yellow900: '#876800',
  yellow950: '#614700',

  // Gold
  gold: '#F2A90F',
  gold50: '#FFFBE6',
  gold100: '#FFF2BF',
  gold200: '#FFE799',
  gold300: '#FFDB73',
  gold400: '#FFCF4D',
  gold500: '#FFC327',
  gold600: '#F2A90F',
  gold700: '#D98A00',
  gold800: '#B36B00',
  gold900: '#8C4D00',
  gold950: '#613400',

  // Orange
  orange: '#FA8C16',
  orange50: '#FFF7E6',
  orange100: '#FFE7BF',
  orange200: '#FFD899',
  orange300: '#FFC973',
  orange400: '#FFBA4D',
  orange500: '#FFAB27',
  orange600: '#FA8C16',
  orange700: '#D46B08',
  orange800: '#AD4E00',
  orange900: '#873800',
  orange950: '#612500',

  // Purple
  purple: '#9254EA',
  purple50: '#FDF8FF',
  purple100: '#F7ECFE',
  purple200: '#EEDCFE',
  purple300: '#D9BAFD',
  purple400: '#C597FF',
  purple500: '#AD72FF',
  purple600: '#9254EA',
  purple700: '#7438D2',
  purple800: '#5629A4',
  purple900: '#400B84',
  purple950: '#280255',

  // Pink
  pink: '#DC258D',
  pink50: '#FFF7FC',
  pink100: '#FFECF6',
  pink200: '#FFD8EF',
  pink300: '#FFAEE4',
  pink400: '#FF7DD2',
  pink500: '#F94AAB',
  pink600: '#DC258D',
  pink700: '#B60D6E',
  pink800: '#8D0053',
  pink900: '#620438',
  pink950: '#3D0023',

  // Common
  white: '#FFFFFF',
  transparent: 'rgba(0, 0, 0, 0)',
} as const;

export interface Ux4gColors {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  info: string;
  onInfo: string;
}

export const lightUx4gColors: Ux4gColors = {
  primary: Ux4gPalette.primary600,
  onPrimary: Ux4gPalette.neutral50,
  secondary: Ux4gPalette.secondary600,
  onSecondary: Ux4gPalette.white,
  background: Ux4gPalette.neutral50,
  onBackground: Ux4gPalette.neutral900,
  surface: Ux4gPalette.white,
  onSurface: Ux4gPalette.neutral900,
  error: Ux4gPalette.red600,
  onError: Ux4gPalette.neutral50,
  success: Ux4gPalette.green600,
  onSuccess: Ux4gPalette.neutral50,
  warning: Ux4gPalette.orange600,
  onWarning: Ux4gPalette.neutral900,
  info: Ux4gPalette.cyan600,
  onInfo: Ux4gPalette.neutral50,
};

export const darkUx4gColors: Ux4gColors = {
  primary: Ux4gPalette.primary300,
  onPrimary: Ux4gPalette.neutral900,
  secondary: Ux4gPalette.secondary300,
  onSecondary: Ux4gPalette.neutral900,
  background: Ux4gPalette.neutral900,
  onBackground: Ux4gPalette.neutral50,
  surface: Ux4gPalette.neutral950,
  onSurface: Ux4gPalette.neutral50,
  error: Ux4gPalette.red300,
  onError: Ux4gPalette.neutral900,
  success: Ux4gPalette.green500,
  onSuccess: Ux4gPalette.neutral900,
  warning: Ux4gPalette.orange500,
  onWarning: Ux4gPalette.neutral900,
  info: Ux4gPalette.cyan500,
  onInfo: Ux4gPalette.neutral900,
};
