import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ArrowRight} from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div
        className={cn("flex flex-col gap-6 w-[450px]", className)}
        {...props}
      >
        <Card className="">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bricolage-grotesque-font">
              Sign in to your account
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">UUID</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your UUID"
                      required
                      className="h-[40px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="h-[40px]"
                      placeholder="Enter your Password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bricolage-grotesque-font border-2 border-black group"
                    variant={"outline"}
                  >
                    <span className="">Login and Go to Dashboard</span>
                    <ArrowRight className="group-hover:transition-all duration-150 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
