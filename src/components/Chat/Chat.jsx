import { useStyleContext } from "../../context/StyleContext";
import TextMessage from "./TextMessage";
import MessageBox from "./MessageBox";

const Chat = () => {
  const { margin } = useStyleContext();

  return (
    <div
      className={`${
        margin ? "ml-[325px]" : "ml-[50px]"
      } z-[-1]  pt-[60px] duration-200`}
    >
      <TextMessage />
      <MessageBox />
    </div>
  );
};

export default Chat;
