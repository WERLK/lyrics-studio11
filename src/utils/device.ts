export function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isTablet() {
  if (typeof window === 'undefined') return false;
  return /iPad|Android|webOS/i.test(navigator.userAgent) && window.innerWidth >= 768;
}

export function getDeviceType() {
  if (isTablet()) return 'tablet';
  if (isMobile()) return 'mobile';
  return 'desktop';
}
