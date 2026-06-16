import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  showNotification(title: string, body: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeNotification');
