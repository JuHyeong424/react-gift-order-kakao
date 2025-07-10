import ItemInfo from '@/components/Order/ItemInfo/ItemInfo.tsx';
import Header from '@/components/Header/Header.tsx';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Receiver from '@/components/Order/Receiver/Receiver.tsx';
import Message from '@/components/Order/Message/Message.tsx';
import OrderButton from '@/components/Order/OrderButton/OrderButton.tsx';
import Sender from '@/components/Order/Sender/Sender.tsx';

export default function Order() {
  const { id } = useParams();
  const [count ,setCount] = useState(0);
  // 각 컴포넌트의 ref를 button으로 전달하여 유효성 검사 실시
  const messageRef = useRef(null);
  const senderRef = useRef(null);
  const receiverRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트(처음 렌더링) 될 때 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0 });
  }, []);

  const orderProps = {
    id,
    count,
    messageRef,
    senderRef,
    receiverRef,
  }

  return (
    <>
      <Header />
      <Message ref={messageRef} />
      <Sender ref={senderRef} />
      <Receiver ref={receiverRef} setCount={setCount}/>
      <ItemInfo id={id}/>
      <OrderButton props={orderProps} />
    </>
  )
}
