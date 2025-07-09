import ItemInfo from '@/components/Order/ItemInfo/ItemInfo.tsx';
import Sender from '@/components/Order/Sender/Sender.tsx';
import Header from '@/components/Header/Header.tsx';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Receiver2 from '@/components/Order/Receiver2/Receiver2.tsx';
import Message2 from '@/components/Order/Message2/Message2.tsx';
import OrderButton2 from '@/components/Order/OrderButton2/OrderButton2.tsx';
import Sender2 from '@/components/Order/Sender2/Sender2.tsx';

export default function Order() {
  const { id } = useParams();
  const [count ,setCount] = useState(0);
  const messageRef = useRef(null);
  const senderRef = useRef(null);
  const receiverRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트(처음 렌더링) 될 때 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Header />
      <Message2 ref={messageRef} />
      <Sender2 ref={senderRef} />
      <Receiver2  ref={receiverRef} setCount={setCount}/>
      <ItemInfo id={id}/>
      <OrderButton2 receiverRef={receiverRef} messageRef={messageRef} senderRef={senderRef} id={id} count={count} />
    </>
  )
}
