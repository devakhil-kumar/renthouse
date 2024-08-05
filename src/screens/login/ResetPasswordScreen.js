import React, { useState,useEffect } from 'react';
import { View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert } from 'react-native';
import { updateUser} from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
const ResetPasswordScreen = ({  navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const route = useRoute();
  const { id } = route.params; // Retrieve 'id' from route.params
  console.log(id)
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Please enter a new password')
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string()
      .required('Please enter the password again')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });


  useEffect(() => {
    setErrors({});
  }, [newPassword, confirmPassword]);

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  const handleSubmit = async () => {
    try {
      await validationSchema.validate({ newPassword, confirmPassword }, { abortEarly: false });
      const resultAction = await dispatch(updateUser({ userData: { password: newPassword }, ID: id }));
      if (updateUser.fulfilled.match(resultAction)) {
        Alert.alert(
          "Success",
          "Password reset successful!",
          [{ text: "OK" }],
          { cancelable: false }
        );
        navigation.navigate('Login');
      } else if (updateUser.rejected.match(resultAction)) {
        setErrors({ form: resultAction.payload || 'Password reset failed. Please try again.' });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ form: 'An error occurred. Please try again.' });
      }
    }
  };

  const getInputBorderColor = (field) => {
    if (errors[field]) return 'red';
    return '#ddd';
  };

  return (<>
     <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Reset Password</Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('newPassword') }]}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={(value) => handleInputChange('newPassword', value)}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>
            {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

            <View style={[styles.inputContainer, { borderColor: getInputBorderColor('confirmPassword') }]}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

            <TouchableOpacity 
              style={[styles.button, loading && styles.disabledButton]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  disabledButton: {
    backgroundColor: '#a9c8e8', // A lighter shade of your button color
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
  },
  header: {
    marginBottom: 30,
    backgroundColor: '#4a90e2',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;