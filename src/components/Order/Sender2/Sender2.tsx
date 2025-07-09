import {
  Title,
  SendeInfo,
  SenderName,
  SenderWrapper,
  SenderInput,
  SendInfo, SendError,
} from '@/components/Order/Sender2/Sender2.style.ts';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';

export type Ref = {
  triggerSenderValidation: () => Promise<boolean>;
};

function Sender2Component(_: unknown, ref: React.Ref<Ref>) {
  const [watchValidation, setWatchValidation] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender: '',
    }
  });

  const text = watch("sender");

  useImperativeHandle(ref, () => ({
    triggerSenderValidation: async () => {
      setWatchValidation(true);
      return await trigger("sender");
    }
  }));

  const onSubmit = data => {
    console.log(data);
  }

  return (
    <SenderWrapper>
      <Title>보내는 사람</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SenderInput
          {...register("sender", {
            required: "이름을 입력해주세요."
          })}
          value={text}
          onChange={(e) => {
            setValue("sender", e.target.value);
            if (watchValidation) trigger("sender");
          }}
          placeholder="이름을 입력하세요."
          isActive={errors.sender}
        />
        {errors.sender ? <SendError>{errors.sender.message}</SendError> : <SendInfo>* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.</SendInfo>}
      </form>
    </SenderWrapper>
  )
}

const Sender2 = forwardRef<Ref>(Sender2Component);
export default Sender2;

