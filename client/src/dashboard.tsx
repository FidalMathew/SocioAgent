import {useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {CheckCircle2, Circle} from "lucide-react";
import {ConnectWallet} from "./components/ConnectWallet";
import {ConnectSocial} from "./components/ConnectSocial";
import {ManageMappings} from "./components/ManageMapping";

type Step = "wallet" | "social" | "manage";

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState<Step>("wallet");

  const steps = {
    wallet: {
      title: "Connect Ethereum Wallet",
      description: "Connect your Ethereum wallet to get started.",
      component: <ConnectWallet onConnect={() => setCurrentStep("social")} />,
    },
    social: {
      title: "Connect Social Account",
      description: "Link your social media account.",
      component: <ConnectSocial onConnect={() => setCurrentStep("manage")} />,
    },
    manage: {
      title: "Manage Mappings",
      description: "Manage your wallet and social account mappings.",
      component: <ManageMappings />,
    },
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/70 backdrop-blur-sm border-none shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-teal-800 mb-2">
            Ethereum Social Dashboard
          </CardTitle>
          <CardDescription className="text-teal-600">
            Connect, Link, and Manage Your Digital Identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
}
