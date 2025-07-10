import { SenderInput, SendError, SendInfo } from '@/components/Order/Sender/Sender.style.ts';

export default function SenderForm({ handleSubmit, onSubmit, register, text, setValue, watchValidation, trigger, error }) {
  return (
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
        isActive={error}
      />
      {error ? <SendError>{error.message}</SendError> :
        <SendInfo>* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.</SendInfo>}
    </form>
  )
}
