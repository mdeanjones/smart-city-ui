export default class ColorUtils {
  static getColorPalette(colorA, colorB, ratios) {
    const results = [ColorUtils.addHexPrefix(colorA)];

    for (let i = 0; i < ratios.length; i += 1) {
      results.push(ColorUtils.getRatioBetween(colorB, colorA, ratios[i]));
    }

    results.push(ColorUtils.addHexPrefix(colorB));
    return results;
  };


  static getRatioBetween(colorA, colorB, ratio) {
    colorA = ColorUtils.getRGB(colorA);
    colorB = ColorUtils.getRGB(colorB);

    const r = Math.ceil(colorA.r * ratio + colorB.r * (1 - ratio));
    const g = Math.ceil(colorA.g * ratio + colorB.g * (1 - ratio));
    const b = Math.ceil(colorA.b * ratio + colorB.b * (1 - ratio));

    return `#${ColorUtils.toHexString(r)}${ColorUtils.toHexString(g)}${ColorUtils.toHexString(b)}`;
  };


  static getRGB(color) {
    color = ColorUtils.stripHexPrefix(color);

    return {
      r: parseInt(color.substring(0, 2), 16),
      g: parseInt(color.substring(2, 4), 16),
      b: parseInt(color.substring(4, 6), 16),
    };
  };


  static toHexString(x) {
    x = x.toString(16);
    return x.length === 1 ? `0${x}` : x;
  };


  static stripHexPrefix(color) {
    if (color.charAt(0) === '#') {
      color = color.substr(1);
    }

    return color;
  };


  static addHexPrefix(color) {
    return color.charAt(0) !== '#' ? `#${color}` : color;
  };
}
