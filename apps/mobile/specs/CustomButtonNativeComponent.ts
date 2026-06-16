import type { ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  text: string;
  disabled?: boolean;
  onCustomButtonPress?: DirectEventHandler<null>;
}

export default codegenNativeComponent<NativeProps>('CustomButton');
