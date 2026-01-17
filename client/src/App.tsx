import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import Sell from "@/pages/Sell";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import StudentHousing from "@/pages/StudentHousing";
import Hotels from "@/pages/Hotels";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/biens" component={Properties} />
      <Route path="/etudiants" component={StudentHousing} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/publier" component={Sell} />
      <Route path="/vendre" component={Sell} />
      <Route path="/a-propos" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
