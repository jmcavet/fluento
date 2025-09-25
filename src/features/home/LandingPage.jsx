import tw from "tailwind-styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/icons/logo.svg";

const MainContainer = tw.div`flex flex-col`;

const Header = tw.div`bg-neutral-900 text-neutral-0 h-28 p-8 flex items-center justify-between`;
// const Logo = tw.div`text-5xl font-bold`;
const CallToAction = tw.div`flex items-center justify-end gap-8`;

const MainContent = tw.div`bg-neutral-100 flex flex-col gap-16 p-8 overflow-scroll`;
const CatchPhrase = tw.p`text-5xl leading-[4.5rem] text-center px-8 my-8`;
const Message = tw.p`text-3xl text-center leading-[2.8rem]`;

const Footer = tw.div`bg-neutral-900 text-neutral-0 text-center h-28 p-8`;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Header>
        <div>
          <img src={LogoSVG} alt="Fluento logo" className="w-48 h-auto" />
        </div>
        <CallToAction>
          <Button
            size="small"
            variation="primaryOutlined"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button size="small" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </CallToAction>
      </Header>
      <MainContent>
        <CatchPhrase>
          With <span className="font-bold text-primary-800">FluentO</span>,
          learn foreign languages with
          <span className="text-primary-500 mx-2 font-bold">context</span>
        </CatchPhrase>
        <Message>
          Choose the vocabulary
          <span className="mx-2 font-bold italic text-primary-500">YOU</span>
          want to learn and improve your language through our fun game
        </Message>
        <div className="flex flex-col items-center gap-8">
          <Button size="full" onClick={() => navigate("/signup")}>
            Get started
          </Button>
          <Button
            size="full"
            variation="primaryOutlined"
            onClick={() => navigate("/login")}
          >
            I have an account
          </Button>
        </div>
        <div className="h-[25rem] bg-primary-100">
          <p>Philosophy of Fluento</p>
        </div>
        <div className="h-[25rem] bg-primary-200">
          Learn based on your own environment
        </div>
        <div className="h-[25rem] bg-primary-100">
          Learn real-life vocabulary
        </div>
        <div className="h-[25rem] bg-primary-200">
          Monitor your progres over time
        </div>
      </MainContent>
      <Footer>
        &copy; Copyright {new Date().getFullYear()} by Jean-Marie Cavet
      </Footer>
    </MainContainer>
  );
}
