/**
 * UX4G Design System Asset Registry
 * Provides strongly-typed mappings and require() declarations for all SVG icons and PNG images
 * ported from the UX4G Flutter design system assets.
 */

export const Ux4gAssetIcons = {
  androidWhite: require('./icons/Android_White.svg'),
  androidColor: require('./icons/Android_color.svg'),
  appleWhite: require('./icons/Apple_White.svg'),
  appleColor: require('./icons/Apple_color.svg'),
  behanceColor: require('./icons/Behane_color.svg'),
  behanceWhite: require('./icons/Behane_white.svg'),
  dribbbleWhite: require('./icons/Dribbbe_White.svg'),
  dribbbleColor: require('./icons/Dribbbe_color.svg'),
  figmaWhite: require('./icons/Figma_White.svg'),
  figmaColor: require('./icons/Figma_color.svg'),
  githubWhite: require('./icons/Github_White.svg'),
  githubColor: require('./icons/Github_color.svg'),
  gmailWhite: require('./icons/Gmail_White.svg'),
  gmailColor: require('./icons/Gmail_color.svg'),
  googleMeetWhite: require('./icons/Google Meet_White.svg'),
  googleMeetColor: require('./icons/Google Meet_color.svg'),
  googlePlayWhite: require('./icons/Google Play_White.svg'),
  googlePlayColor: require('./icons/Google Play_color.svg'),
  googleWhite: require('./icons/Google_White.svg'),
  googleColor: require('./icons/Google_color.svg'),
  instagramWhite: require('./icons/Instagram_White.svg'),
  instagramColor: require('./icons/Instagram_color.svg'),
  mediumWhite: require('./icons/Medium_White.svg'),
  mediumColor: require('./icons/Medium_color.svg'),
  microsoftTeamsWhite: require('./icons/Microsoft Teams_White.svg'),
  microsoftTeamsColor: require('./icons/Microsoft Teams_color.svg'),
  notionWhite: require('./icons/Notion_White.svg'),
  notionColor: require('./icons/Notion_color.svg'),
  redditWhite: require('./icons/Reddit_White.svg'),
  redditColor: require('./icons/Reddit_color.svg'),
  skypeWhite: require('./icons/Skype_White.svg'),
  skypeColor: require('./icons/Skype_color.svg'),
  slackWhite: require('./icons/Slack_White.svg'),
  slackColor: require('./icons/Slack_color.svg'),
  socialWhite: require('./icons/Social_White.svg'),
  socialColor: require('./icons/Social_color.svg'),
  stackOverflowWhite: require('./icons/StackOverflow_White.svg'),
  stackOverflowColor: require('./icons/StackOverflow_color.svg'),
  twitterWhite: require('./icons/Twitter_White.svg'),
  twitterColor: require('./icons/Twitter_color.svg'),
  union: require('./icons/Union.svg'),
  vectorColor: require('./icons/Vector_color.svg'),
  vectorWhite: require('./icons/Vector_white.svg'),
  whatsAppWhite: require('./icons/WhatsApp_White.svg'),
  whatsAppColor: require('./icons/WhatsApp_color.svg'),
  youTubeWhite: require('./icons/YouTube_White.svg'),
  youTubeColor: require('./icons/YouTube_color.svg'),
  zoomWhite: require('./icons/Zoom_White.svg'),
  zoomColor: require('./icons/Zoom_color.svg'),
  digitalIndiaLogo: require('./icons/digital_india_logo.svg'),
  fillRevInfo: require('./icons/fill_rev-info.svg'),
  icFace0: require('./icons/ic_face_0.svg'),
  icFace1: require('./icons/ic_face_1.svg'),
  icFace2: require('./icons/ic_face_2.svg'),
  icFace3: require('./icons/ic_face_3.svg'),
  icFace4: require('./icons/ic_face_4.svg'),
  inbox: require('./icons/inbox.svg'),
  liveChat: require('./icons/liveChat_ic.svg'),
  lockFill: require('./icons/lock_fill.svg'),
  nationalEmblemLogo: require('./icons/national_amblam_logo.svg'),
  star: require('./icons/star.svg'),
  verification: require('./icons/verification.svg'),
  warningFill: require('./icons/warning_fill.svg'),
} as const;

export type Ux4gAssetIconKey = keyof typeof Ux4gAssetIcons;

export const Ux4gAssetImages = {
  digitalIndiaLogoPng: require('./images/digital_india_logo.png'),
} as const;

export type Ux4gAssetImageKey = keyof typeof Ux4gAssetImages;

export const Ux4gAssets = {
  icons: Ux4gAssetIcons,
  images: Ux4gAssetImages,
} as const;
