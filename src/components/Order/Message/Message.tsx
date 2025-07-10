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

  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      setWatchValidation(true);
      return await trigger("textMessage");
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
const Message = forwardRef<Ref>(Message2Component);
export default Message;
