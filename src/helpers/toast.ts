import Toast from 'react-native-toast-message';

export function infoToast({toastTitle = '', toastDescription = ''}) {
  Toast.show({
    type: 'info',
    text1: toastTitle,
    text2: toastDescription,
  });
}

export function successToast({toastTitle = '', toastDescription = ''}) {
  Toast.show({
    type: 'success',
    text1: toastTitle,
    text2: toastDescription,
  });
}

export function errorToast({toastTitle = '', toastDescription = ''}) {
  Toast.show({
    type: 'error',
    text1: toastTitle,
    text2: toastDescription,
  });
}
