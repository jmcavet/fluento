import tw from "tailwind-styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/icons/logo.svg";

const MainContainer = tw.div`flex flex-col`;

const Header = tw.div`bg-neutral-900 text-neutral-0 h-28 px-8 flex items-center justify-between`;
const CallToAction = tw.div`flex items-center justify-end gap-8`;

const MainContent = tw.div`bg-neutral-100 w-full pt-8 pb-32`;
const Hero = tw.div`flex flex-col gap-16 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`;
const CatchPhrase = tw.p`text-4xl leading-[4.5rem] text-center px-8 mb-8`;
const Message = tw.p`text-2xl text-center leading-[2.8rem]`;
const Section = tw.div`w-full py-24 flex gap-6`;
const SectionContent = tw.div`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`;
const SectionHeader = tw.div`text-3xl font-bold mb-4`;
const SectionParagraph = tw.div`text-base leading-relaxed`;
const Footer = tw.div`bg-neutral-900 text-neutral-0 text-sm text-center h-20 p-8`;

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
        <Hero>
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
              I already have an account
            </Button>
          </div>
        </Hero>
      </MainContent>
      <Section>
        <SectionContent>
          <p>Some gif of the Project creation...</p>
        </SectionContent>
        <SectionContent>
          <SectionHeader>1 project for 1 context</SectionHeader>
          <SectionParagraph>
            With FluentO, teach yourself multiple foreign languages by creating
            projects for your favourite environments (e.g. work, environment,
            sport...).
          </SectionParagraph>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionHeader>Choose your own vocabulary</SectionHeader>
          <SectionParagraph>
            Reading a newspaper, hearing a conversation. Catch the words YOU
            decide to learn and store them in FluentO. No time to find the
            translation? Do it later! Plus, give each word tags and you will be
            able to filter them easily later.
          </SectionParagraph>
        </SectionContent>
        <SectionContent>
          <p>Some gif of the Vocabulary page...</p>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <p>Some gif of the game page...</p>
        </SectionContent>
        <SectionContent>
          <SectionHeader>Learn by playing</SectionHeader>
          <SectionParagraph>Play the game...</SectionParagraph>
        </SectionContent>
      </Section>

      <Section className="bg-primary-500">
        <SectionContent>
          <SectionHeader className="text-primary-300">
            Monitor your progress over time
          </SectionHeader>
          <SectionParagraph className="text-neutral-0">
            This is some text about the homepage. It will be nicely constrained
            on large screens, and almost full width on small devices. On laptops
            or desktops, it won’t stretch too wide, so the text stays readable.
          </SectionParagraph>
        </SectionContent>
      </Section>

      <Footer>
        &copy; Copyright {new Date().getFullYear()} by Jean-Marie Cavet
      </Footer>
    </MainContainer>
  );
}
