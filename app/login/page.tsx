"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OtpDrawer } from "@/components/login/Drawer";
import { useState, useTransition } from "react";
import { sendAuthMail } from "@/lib/actions/auth/send-auth-mail";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    setError(""); // Clear any previous errors

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      const res = await sendAuthMail(email);

      if (res.success) {
        setIsOtpSend(true);
      } else {
        setError(res.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <OtpDrawer
        email={email}
        isOpenOtpDrawer={isOtpSend}
        setIsOpenOtpDrawer={setIsOtpSend}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="button"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
