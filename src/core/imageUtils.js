/* @flow */
import { isAllowedOrigin } from 'core/utils';
import fallbackIcon from 'amo/img/icons/default-64.png';
import type { AddonType } from 'core/types/addons';

type ObjectWithIcons = {
  icon_url: string,
};

export function getAddonIconUrl(addon: ?ObjectWithIcons): string {
  return addon && isAllowedOrigin(addon.icon_url)
    ? addon.icon_url
    : fallbackIcon;
}

type ObjectWithPreviews = {
  previews: $PropertyType<AddonType, 'previews'>,
};

type GetPreviewImageOptions = {|
  index?: number,
  full?: boolean,
|};

export const getPreviewImage = (
  addon: ?ObjectWithPreviews,
  { index = 0, full = true }: GetPreviewImageOptions = {},
): string | null => {
  const preview =
    addon && addon.previews && addon.previews.length && addon.previews[index];

  if (preview) {
    const previewSize = full ? 'image_url' : 'thumbnail_url';
    return preview[previewSize] && isAllowedOrigin(preview[previewSize])
      ? preview[previewSize]
      : null;
  }

  return null;
};
