import { orderMessage } from '@/data/orderMessage.ts';
import {
  ErrorMessage,
  GifImage,
  GifWrapper,
  ImageWrapper, TextArea,
  Wrapper,
} from '@/components/Order/Message2/Message2.style.ts';
import MessageImage from "@/components/Common/MessageImage/MessageImage.tsx"
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';

export type Ref = {
  triggerValidation: () => Promise<boolean>;
};

function Message2Component(_: unknown, ref: React.Ref<Ref>) {
  const [image, setImage] = useState(orderMessage[0].imageUrl);
  const [watchValidation, setWatchValidation] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      textMessage: orderMessage[0].defaultTextMessage,
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  const text = watch("textMessage");

  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      setWatchValidation(true);
      return await trigger("textMessage");
    }
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
        <TextArea
          {...register("textMessage", {
            required: "메시지를 입력해주세요."
          })}
          value={text}
          onChange={(e) => {
            setValue("textMessage", e.target.value);
            if (watchValidation) trigger("textMessage");
          }}
          isActive={errors.textMessage}
          placeholder="메시지를 입력해주세요."
        />
        {errors.textMessage && <ErrorMessage>{errors.textMessage.message}</ErrorMessage>}
      </form>
    </Wrapper>
  );
}

// 타입을 확실히 명시하고 export
const Message2 = forwardRef<Ref>(Message2Component);
export default Message2;
