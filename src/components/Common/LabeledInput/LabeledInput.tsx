import {
  ReceiverWarn, RecevierSpan, LabeledInputWrapper, InputWrapper,
} from '@/components/Common/LabeledInput/LabeledInput.style.ts';

export default function LabeledInput({ label, errorMessage, showError, comment, children }: {
  label?: string;
  errorMessage?: string | React.ReactNode;
  showError?: boolean;
  comment?: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <LabeledInputWrapper>
      {label && <RecevierSpan>{label}</RecevierSpan>}
      <InputWrapper>
        {children}
        {showError ? <ReceiverWarn>{errorMessage}</ReceiverWarn> : comment}
      </InputWrapper>
    </LabeledInputWrapper>
  );
}
