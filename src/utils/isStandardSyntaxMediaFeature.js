/**
 * Check whether a media feature is standard
 *
 * @param {string} media feature value
 * @return {boolean} If `true`, the declaration is standard
 */
export default function (mediaFeatureValue) {

  if (mediaFeatureValue[0] === "-" && mediaFeatureValue[1] === "-") { return false }

  if (/#{.+?}|\$.+?/.test(mediaFeatureValue)) { return false }

  return true
}
