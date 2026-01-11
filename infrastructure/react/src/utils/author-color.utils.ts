import type { Theme } from "../stores/theme.store";

function hexToHsl(hex: string): [number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h: number, s: number;
	const l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default:
				h = 0;
		}
		h /= 6;
	}

	return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
	h /= 360;
	s /= 100;
	l /= 100;

	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};

	let r: number, g: number, b: number;

	if (s === 0) {
		r = g = b = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	const toHex = (c: number) => {
		const hex = Math.round(c * 255).toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getRelativeLuminance(hex: string): number {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;

	const rLum = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
	const gLum = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
	const bLum = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

	return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

function getContrastRatio(color1: string, color2: string): number {
	const lum1 = getRelativeLuminance(color1);
	const lum2 = getRelativeLuminance(color2);
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	return (lighter + 0.05) / (darker + 0.05);
}

function isHueTooClose(
	hue: number,
	forbiddenHues: number[],
	threshold = 30,
): boolean {
	return forbiddenHues.some(
		(fh) => Math.abs(((hue - fh + 180) % 360) - 180) < threshold,
	);
}

export function getAuthorColor(login: string, theme: Theme): string {
	let hash = 0;
	for (let i = 0; i < login.length; i++) {
		hash = (hash << 5) - hash + login.charCodeAt(i);
		hash = hash & hash;
	}

	const [primaryH] = hexToHsl(theme.primary);
	const [secondaryH] = hexToHsl(theme.secondary);
	const forbiddenHues = [primaryH, secondaryH];

	let hue = Math.abs(hash) % 360;
	let attempts = 0;
	while (isHueTooClose(hue, forbiddenHues) && attempts < 10) {
		hue = (hue + 37) % 360;
		attempts++;
	}

	const [_, baseS, baseL] = hexToHsl(theme.primary);
	let saturation = Math.max(40, Math.min(80, baseS));
	let lightness = Math.max(30, Math.min(70, baseL));

	let color = hslToHex(hue, saturation, lightness);
	let contrast = getContrastRatio(color, theme.background);

	if (contrast < 4.5) {
		const bgLuminance = getRelativeLuminance(theme.background);
		if (bgLuminance > 0.5) {
			lightness = Math.max(10, lightness - 20);
		} else {
			lightness = Math.min(90, lightness + 20);
		}
		color = hslToHex(hue, saturation, lightness);
		contrast = getContrastRatio(color, theme.background);
		if (contrast < 4.5) {
			saturation = Math.min(100, saturation + 20);
			color = hslToHex(hue, saturation, lightness);
		}
	}

	return color;
}
