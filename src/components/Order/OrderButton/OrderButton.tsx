import { PriceButton } from '@/components/Order/OrderButton/OrderButton.style.ts';
import useOrderButton from '@/hooks/order/useOrderButton.ts';

export default function OrderButton({ props }) {
  const {
    handleClick,
    price,
  } = useOrderButton(props);

  return (
    <PriceButton onClick={handleClick}>{price}원 주문하기</PriceButton>
  )
}
