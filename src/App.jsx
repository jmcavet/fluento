import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Voca from "./pages/Voca";
import Game from "./pages/Game";
import Dictionary from "./pages/Dictionary";

import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DictionaryProvider } from "./contexts/DictionaryContext";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ProjectSetup from "./pages/ProjectSetup";
import { ProjectProvider } from "./contexts/ProjectContext";
import { compose } from "./contexts/providerComposer";
import Incomplete from "./pages/Incomplete";
import { VocaProvider } from "./contexts/VocaContext";
import { GeneralSettingsProvider } from "./contexts/GeneralSettingsContext";
import { GameProvider } from "./contexts/GameContext";
import { VocaFilterProvider } from "./contexts/VocaFilterContext";
import LandingPage from "./features/home/LandingPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

const MainProvider = compose([
  ProjectProvider,
  GameProvider,
  DictionaryProvider,
  VocaProvider,
  VocaFilterProvider,
  GeneralSettingsProvider,
]);

export function App() {
  return (
    <MainProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <GlobalStyles />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="project-setup" element={<ProjectSetup />} />
            <Route path="/voca" element={<Voca />} />
            <Route path="/game" element={<Game />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/account" element={<Account />} />
            <Route path="/incomplete" element={<Incomplete />} />
          </Route>

          {/* The Login is outside of the protected route, otherwise no one can access it whenever not authenticated */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>

        <Toaster
          position="top-center"
          gutter="12"
          containerStyle={{ margin: "1rem" }}
          toastOptions={{
            success: { duration: 2000 },
            error: { duration: 2000 },
            style: {
              fontSize: "1.6rem",
              maxWidth: "50rem",
              padding: "1.6rem 2.4rem",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-800)",
            },
          }}
        />
      </QueryClientProvider>
    </MainProvider>
  );
}

export default App;
