import { lazy, type ComponentType } from 'react';
import { reloadOnceForBuildAssetError } from './assetLoadRecovery';

type LazyImport<T extends ComponentType<any>> = () => Promise<{ default: T }>;

const LAZY_WITH_RECOVERY_ROUTE = Symbol('lazy-with-recovery-route');

export const isLazyWithRecoveryComponent = (component: unknown): boolean =>
  typeof component === 'object' &&
  component !== null &&
  (component as { [LAZY_WITH_RECOVERY_ROUTE]?: true })[LAZY_WITH_RECOVERY_ROUTE] === true;

export function lazyWithRecovery<T extends ComponentType<any>>(loader: LazyImport<T>) {
  let loadPromise: Promise<{ default: T }> | undefined;

  const load = () => {
    loadPromise ??= loader().catch(error => {
      if (reloadOnceForBuildAssetError(error)) {
        return new Promise<{ default: T }>(() => undefined);
      }

      throw error;
    });

    return loadPromise;
  };

  const Component = lazy(load) as ReturnType<typeof lazy<T>> & { [LAZY_WITH_RECOVERY_ROUTE]: true };

  Component[LAZY_WITH_RECOVERY_ROUTE] = true;

  return Component;
}
