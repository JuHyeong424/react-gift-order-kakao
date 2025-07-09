import type {  TextFieldState } from '@/types/orderForm.ts';

interface ValidateInput {
  message: TextFieldState;
  sender: TextFieldState;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    message: boolean;
    sender: boolean;
  }
}

export const validateOrderForm =
  ({
     message, sender,
  }: ValidateInput): ValidationResult => {
  const errors = {
    message: !message.text,
    sender: !sender.text,
  };

  // 조건이 모두 false여야 true가 나옴
  const isValid = Object.values(errors).every(err => !err);

  return { isValid, errors };
}