import {
  Title,
  SenderWrapper,
} from '@/components/Order/Sender/Sender.style.ts';
import { forwardRef, Ref, useImperativeHandle } from 'react';
import type { SenderRef } from '@/types/order.ts';
import useSenderForm from '@/hooks/order/useSenderForm.ts';
import SenderForm from '@/components/Order/Sender/SenderForm.tsx';

function Sender2Component(_: unknown, ref: React.Ref<SenderRef>) {
  const {
    watchValidation,
    setWatchValidation,
    register,
    handleSubmit,
    setValue,
    trigger,
    errors,
    text
  } = useSenderForm();

  // 특정 함수에 접근, forwardRef에 등록
  useImperativeHandle(ref, () => ({
    triggerSenderValidation: async () => {
      setWatchValidation(true);
      return await trigger("sender");
    },
    getSender: () => text,
  }));

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <SenderWrapper>
      <Title>보내는 사람</Title>

      <SenderForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        text={text}
        setValue={setValue}
        watchValidation={watchValidation}
        trigger={trigger}
        error={errors.sender}
      />
    </SenderWrapper>
  )
}

// 타입을 확실히 명시하고 export
// 부모가 자식 dom에 접근
const Sender = forwardRef<Ref>(Sender2Component);
export default Sender;
