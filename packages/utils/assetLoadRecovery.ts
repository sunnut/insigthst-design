const RECOVERY_SESSION_KEY = 'data-platform:asset-load-recovery-at';
const RECOVERY_THROTTLE_MS = 60_000;

const ASSET_LOAD_ERROR_PATTERNS = [
  /failed\s+to\s+fetch\s+dynamically\s+imported\s+module/i,
  /failed\s+to\s+load\s+module\s+script/i,
  /loading\s+chunk\s+\d+\s+failed/i,
  /chunkloaderror/i,
  /unable\s+to\s+preload\s+css/i,
  /importing\s+a\s+module\s+script\s+failed/i,
];

function getErrorText(error: unknown) {
  if (error instanceof Error) {
    return `${error.name} ${error.message} ${error.stack || ''}`;
  }

  if (typeof error === 'string') {
    return error;
  }

  return String(error);
}

export function isBuildAssetLoadError(error: unknown) {
  const errorText = getErrorText(error);

  return ASSET_LOAD_ERROR_PATTERNS.some(pattern => pattern.test(errorText));
}

export function reloadOnceForBuildAssetError(error: unknown, options: { force?: boolean } = {}) {
  if (!options.force && !isBuildAssetLoadError(error)) {
    return false;
  }

  const now = Date.now();
  const lastRecoveryAt = Number(window.sessionStorage.getItem(RECOVERY_SESSION_KEY) || 0);

  if (Number.isFinite(lastRecoveryAt) && now - lastRecoveryAt < RECOVERY_THROTTLE_MS) {
    return false;
  }

  window.sessionStorage.setItem(RECOVERY_SESSION_KEY, String(now));
  window.location.reload();

  return true;
}

export function registerBuildAssetLoadRecovery() {
  window.addEventListener('vite:preloadError', event => {
    event.preventDefault();
    reloadOnceForBuildAssetError(event.payload, { force: true });
  });
}
