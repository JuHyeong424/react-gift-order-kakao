import { PriceButton } from '@/components/Order/OrderButton2/OrderButton2.style.ts';
import { useEffect, useState } from 'react';

export default function OrderButton2({id, count, messageRef, senderRef}) {
  const item = JSON.parse(localStorage.getItem('expandedList'))[id - 1];
  const itemPrice = item.price.sellingPrice;

  const [price, setPrice] = useState(itemPrice * count);

  useEffect(() => {
    setPrice(itemPrice * count);
  }, [count]);

  const handleClick = async () => {
    const isMessageValid = await messageRef.current?.triggerValidation();
    const isSenderValid = await senderRef.current?.triggerSenderValidation();
    if (!isMessageValid || !isSenderValid) {
      return;
    }
  }

  return (
    <PriceButton onClick={handleClick}>{price}원 주문하기</PriceButton>
  )
}
