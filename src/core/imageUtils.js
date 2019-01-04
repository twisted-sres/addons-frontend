/* @flow */
import { isAllowedOrigin } from 'core/utils';
import fallbackIcon from 'amo/img/icons/default-64.png';
import type { AddonType } from 'core/types/addons';

type ObjectWithIconURL = {
  icon_url: string,
};

type ObjectWithIcons = {
  icons: $PropertyType<AddonType, 'icons'>,
};

type GetAddonIconUrlParam = ObjectWithIconURL | ObjectWithIcons;

export function getAddonIconUrl(addon: ?GetAddonIconUrlParam): string {
  if (addon && addon.icon_url && isAllowedOrigin(addon.icon_url)) {
    return (addon: ObjectWithIconURL).icon_url;
  }

  return fallbackIcon;
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
