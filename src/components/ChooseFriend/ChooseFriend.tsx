import { Message, PlusButton, Wrapper } from '@/components/ChooseFriend/ChooseFriend.styes';
import { CHOOSE_FRIEND_STORAGE_ID } from '@/constants/storage.ts';

export default function ChooseFriend() {
  const id = sessionStorage.getItem(CHOOSE_FRIEND_STORAGE_ID);

  return (
    <Wrapper>
      <PlusButton>+</PlusButton>
      <Message>{id ? `${id}님!` : ``} 선물한 친구를 선택해 주세요.</Message>
    </Wrapper>
  );
}
