
import { Input, ItemInput, ReceiverItem } from '@/components/Order/Receiver/Receiver.style.ts';

export default function ReceiverInput({ type, label, name, placeholder,  register, validate, error }) {
  return (
    <ReceiverItem>
      <span>{label}</span>
      <ItemInput>
        <Input
          type={type}
          {...register(name, {
            required: `${label}를 입력해주세요`,
            validate,
          })}
          isActive={error}
          placeholder={placeholder}
        />
        {error?.message &&
          <p>{error.message}</p>}
      </ItemInput>
    </ReceiverItem>
  );
}
