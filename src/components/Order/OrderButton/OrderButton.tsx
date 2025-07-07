import { PriceButton } from '@/components/Order/OrderButton/OrderButton.style.ts';
import useOrderHandler from '@/hooks/useOrderHandler.tsx';

export default function OrderButton(props) {
  const { price, handleOrder } = useOrderHandler(props);

  return (
    <PriceButton onClick={handleOrder}>{price}원 주문하기</PriceButton>
  )
}
