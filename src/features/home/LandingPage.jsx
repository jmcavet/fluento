import tw from "tailwind-styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/icons/logo.svg";

const MainContainer = tw.div`flex flex-col`;

const Header = tw.div`bg-neutral-900 text-neutral-0 h-16 px-8 flex items-center justify-between`;
const CallToAction = tw.div`flex items-center justify-end gap-8`;

const MainContent = tw.div`bg-neutral-100 w-full pt-8 pb-28`;
const Hero = tw.div`flex flex-col gap-16 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8`;
const CatchPhrase = tw.p`text-3xl leading-tight font-bold text-center px-8 mb-4 md:text-5xl md:leading-snug`;
const Message = tw.p`text-lg text-center leading-relaxed md:text-xl md:mt-6`;

const Section = tw.div`px-4 py-12`;
const SectionContent = tw.div`flex flex-col items-center gap-8 sm:flex-row sm:gap-12`;
const SectionHeader = tw.h2`text-2xl font-bold mb-4 tracking-tight leading-snug md:text-3xl lg:text-4xl`;
const SectionParagraph = tw.div`text-base leading-relaxed md:text-lg lg:text-xl`;

const SectionImageContainer = tw.div`w-full sm:w-1/2 flex justify-center`;
const SectionImage = tw.img`w-full max-w-sm rounded-xl shadow-md`;

const SectionMessageContainer = tw.div`w-full sm:w-1/2 text-left sm:text-left`;
const SectionMessageTitle = tw.h2`text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl`;
const SectionMessageText = tw.p`mt-3 text-base text-gray-600 leading-relaxed md:text-lg lg:text-xl`;

const Footer = tw.div`bg-neutral-900 text-neutral-0 text-sm text-center h-20 p-8`;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Header>
        <div>
          <img src={LogoSVG} alt="Fluento logo" className="w-32 h-auto" />
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
            Choose words that matter most to
            <span className="mx-2 font-bold italic text-primary-500">YOU</span>
            and improve your language with our fun game
          </Message>
          <p className="text-sm">
            Build your own vocabulary projects, practice with games, and track
            your progress — tailored to your real-life contexts.
          </p>
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
          <SectionMessageContainer className="sm:order-1">
            <SectionMessageTitle>
              Organize learning into projects
            </SectionMessageTitle>
            <SectionMessageText>
              With FluentO, focus your learning by creating projects for
              specific languages and contexts — whether it is work vocabulary,
              family conversations, or sports practice.
            </SectionMessageText>
          </SectionMessageContainer>

          <SectionImageContainer className="sm:order-2">
            <SectionImage src={LogoSVG} alt="Illustration" />
          </SectionImageContainer>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionMessageContainer className="sm:order-2">
            <SectionMessageTitle>
              Save the words that matter to you
            </SectionMessageTitle>
            <SectionMessageText>
              Reading a newspaper or hearing a conversation? Quickly add new
              words and expressions with translations, usage context, and tags
              so you can find and study them later.
            </SectionMessageText>
          </SectionMessageContainer>

          <SectionImageContainer className="sm:order-1">
            <SectionImage src={LogoSVG} alt="Illustration" />
          </SectionImageContainer>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionMessageContainer className="sm:order-1">
            <SectionMessageTitle>
              Practice with smart flashcards
            </SectionMessageTitle>
            <SectionMessageText>
              Play a flipping card game tailored to your needs. Filter words,
              test yourself, and track how well you know each term.
            </SectionMessageText>
          </SectionMessageContainer>

          <SectionImageContainer className="sm:order-2">
            <SectionImage src={LogoSVG} alt="Illustration" />
          </SectionImageContainer>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionMessageContainer className="sm:order-2">
            <SectionMessageTitle>
              Save the words that matter to you
            </SectionMessageTitle>
            <SectionMessageText>
              Browse, search, and filter all your saved words. Your own
              vocabulary grows with you — easy to find, easy to review.
            </SectionMessageText>
          </SectionMessageContainer>

          <SectionImageContainer className="sm:order-1">
            <SectionImage src={LogoSVG} alt="Illustration" />
          </SectionImageContainer>
        </SectionContent>
      </Section>

      <Section className="bg-primary-500">
        <SectionContent>
          <SectionHeader className="text-primary-300">
            See by yourself!
          </SectionHeader>
          <SectionParagraph className="text-neutral-0">
            Gif of the application...
          </SectionParagraph>
        </SectionContent>
      </Section>

      <Footer>
        &copy; Copyright {new Date().getFullYear()} by Jean-Marie Cavet
      </Footer>
    </MainContainer>
  );
}
