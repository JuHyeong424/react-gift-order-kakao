import { isValidHypenPhone, isValidPhone } from '@/utils/phoneValidation.ts';
import type { PhoneFiledState, TextFieldState } from '@/types/orderForm.ts';

interface Props {
  message: TextFieldState;
  sender: TextFieldState;
  receiverName: TextFieldState;
  receiverPhone: PhoneFiledState;
  setMessage: React.Dispatch<React.SetStateAction<TextFieldState>>;
  setSender: React.Dispatch<React.SetStateAction<TextFieldState>>;
  setReceiverName: React.Dispatch<React.SetStateAction<TextFieldState>>;
  setReceiverPhone: React.Dispatch<React.SetStateAction<PhoneFiledState>>;
}

export const validateOrderForm =
  ({
     message, setMessage,
     sender, setSender,
     receiverName, setReceiverName,
     receiverPhone, setReceiverPhone,
   }: Props): boolean => {
  let valid = true;

  if (!message.text) {
    setMessage(prev => ({ ...prev, check: true }));
    valid = false;
  }

  if (!sender.text) {
    setSender(prev => ({ ...prev, check: true }));
    valid = false;
  }

  if (!receiverName.text) {
    setReceiverName(prev => ({ ...prev, check: true }));
    valid = false;
  }

  if (!receiverPhone.text) {
    setReceiverPhone(prev => ({ ...prev, check: true }));
    valid = false;
  } else if (!isValidPhone(receiverPhone.text) && !isValidHypenPhone(receiverPhone.text)) {
    setReceiverPhone(prev => ({ ...prev, checkPhoneForm: true }));
    valid = false;
  }

  return valid;
};