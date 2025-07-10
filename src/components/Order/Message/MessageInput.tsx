import { ErrorMessage, TextArea } from '@/components/Order/Message/Message.style.ts';

export default function MessageInput({ register, text, onChange, error }) {
  return (
    <>
      <TextArea
        {...register("textMessage", {
          required: "메시지를 입력해주세요."
        })}
        value={text}
        onChange={onChange}
        isActive={error}
        placeholder="메시지를 입력해주세요."
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  )
}
