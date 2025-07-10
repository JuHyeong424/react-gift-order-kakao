import type { PhoneFiledState, TextFieldState } from '@/types/orderForm.ts';
import { isValidHypenPhone, isValidPhone } from '@/utils/phoneValidation.ts';

interface ValidateInput {
  message: TextFieldState;
  sender: TextFieldState;
  receiverName: TextFieldState;
  receiverPhone: PhoneFiledState;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    message: boolean;
    sender: boolean;
    receiverName: boolean;
    receiverPhone: boolean;
    receiverPhoneFormat: boolean;
  }
}

export const validateOrderForm =
  ({
     message, sender, receiverName, receiverPhone
  }: ValidateInput): ValidationResult => {
  const errors = {
    message: !message.text,
    sender: !sender.text,
    receiverName: !receiverName.text,
    receiverPhone: !receiverPhone.text,
    receiverPhoneFormat: false,
  };

  if (
    receiverPhone.text &&
    !isValidPhone(receiverPhone.text) &&
    !isValidHypenPhone(receiverPhone.text)
  ) {
    errors.receiverPhoneFormat = true;
  }

  // 조건이 모두 false여야 true가 나옴
  const isValid = Object.values(errors).every(err => !err);

  return { isValid, errors };
}