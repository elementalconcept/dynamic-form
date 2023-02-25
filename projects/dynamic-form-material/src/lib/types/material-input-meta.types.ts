import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';

import { SuffixType } from '../types';

export interface MaterialInputMeta {
  appearance?: MatFormFieldAppearance;
  floatLabel?: FloatLabelType;
  hintLabel?: string;
  labelPosition?: 'after' | 'before';
  cssClass?: string;
  color?: ThemePalette;
  suffix?: SuffixType;
  externalLink?: ExternalLinkMeta | null;
  htmlDescription?: string;
  hideRequiredMarker?: boolean;
  sectionTitle?: boolean; // define an `<h5>` element instead of a `<div>` for the `description`
}

export interface ExternalLinkMeta {
  label: string;
  url: string;
}
