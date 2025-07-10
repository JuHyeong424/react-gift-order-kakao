import { orderMessage } from '@/data/orderMessage.ts';
import {
  GifImage,
  GifWrapper,
  ImageWrapper,
  Wrapper, MessageImage
} from '@/components/Order/Message/Message.style.ts';
import { forwardRef, useImperativeHandle } from 'react';
import type { MessageRef } from '@/types/order.ts';
import MessageInput from '@/components/Order/Message/MessageInput.tsx';
import useMessageForm from '@/hooks/useMessageForm.ts';

function Message2Component(_: unknown, ref: React.Ref<MessageRef>) {
  const {
    image,
    setImage,
    watchValidation,
    setWatchValidation,
    register,
    handleSubmit,
    trigger,
    setValue,
    text,
    errors,
    onSubmit,
  } = useMessageForm();

  // 특정 함수에 접근, forwardRef에 등록
  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      setWatchValidation(true);
      return await trigger("textMessage"); // textMessage 유효성 검사
    },
    getMessage: () => text,
  }));

  return (
    <Wrapper>
      <ImageWrapper>
        {orderMessage.map(item => (
          <MessageImage
            key={item.id}
            src={item.thumbUrl}
            alt={item.defaultTextMessage}
            onClick={() => {
              setImage(item.imageUrl);
              setValue("textMessage", item.defaultTextMessage);
            }}
          />
        ))}
      </ImageWrapper>

      <GifWrapper>
        <GifImage src={image} alt={image} />
      </GifWrapper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          register={register}
          text={text}
          onChange={(e) => {
            setValue("textMessage", e.target.value);
            if (watchValidation) trigger("textMessage");
          }}
          error={errors.textMessage}
        />
      </form>
    </Wrapper>
  );
}

// 타입을 확실히 명시하고 export
// 부모가 자식 dom에 접근
const Message = forwardRef<Ref>(Message2Component);
export default Message;
