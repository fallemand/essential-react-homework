import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { createLottery } from '@lottery/shared/utils';
import { Routes, RootStackParamList } from '../../App';
import NativeNotification from '../../specs/NativeNotification';
import CustomButton from '../../specs/CustomButtonNativeComponent';

type AddLotteryProps = NativeStackScreenProps<
  RootStackParamList,
  typeof Routes.AddLottery
>;

type FormData = {
  name: string;
  prize: string;
};

export default function AddLottery({ navigation }: AddLotteryProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      prize: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await createLottery({
        name: data.name,
        prize: data.prize,
        type: 'simple',
      });

      reset();
      navigation.goBack();

      NativeNotification.showNotification(
        'Lottery Created',
        'Your new lottery has been added successfully!'
      );

      Toast.show({
        type: 'success',
        text1: 'New lottery added successfully!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to create lottery',
        text2: error instanceof Error ? error.message : 'Unknown error',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add a new lottery</Text>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Lottery name</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 4,
                  message: 'name must be at least 4 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter lottery name"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Lottery prize</Text>
            <Controller
              control={control}
              name="prize"
              rules={{
                required: 'Prize is required',
                minLength: {
                  value: 4,
                  message: 'prize must be at least 4 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.prize && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter lottery prize"
                />
              )}
            />
            {errors.prize && (
              <Text style={styles.errorText}>{errors.prize.message}</Text>
            )}
          </View>

          <CustomButton
            text="ADD"
            disabled={!isValid || loading}
            onCustomButtonPress={() => handleSubmit(onSubmit)()}
            style={styles.customButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  customButton: {
    width: 120,
    height: 44,
    marginTop: 24,
    alignSelf: 'center',
  },
});
