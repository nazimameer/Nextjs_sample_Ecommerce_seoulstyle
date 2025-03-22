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
import { useState } from "react";

export default function LogIn() {
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);


  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <OtpDrawer
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
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="button"
            onClick={() => setIsOtpSend((prev: boolean) => !prev)}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
