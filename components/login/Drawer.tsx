"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
interface Props {
  isOpenOtpDrawer: boolean;
  setIsOpenOtpDrawer: (open: boolean) => void;
}
export function OtpDrawer({ isOpenOtpDrawer, setIsOpenOtpDrawer }: Props) {
  const [resendTimer, setResendTimer] = useState<number>(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isOpenOtpDrawer) {
      startResendTimer();
    }
  }, [isOpenOtpDrawer]);

  const onSubmit = () => {};
  return (
    <Drawer open={isOpenOtpDrawer} onOpenChange={setIsOpenOtpDrawer}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <div className="flex w-full justify-center">
            <DrawerHeader>
              <DrawerTitle>One-Time Password</DrawerTitle>
              <DrawerDescription>
                Enter your one-time password.
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center w-full justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <button
                        onClick={startResendTimer}
                        disabled={resendTimer > 0}
                        type="button"
                        className={`font-medium ${
                          resendTimer > 0
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-black"
                        }`}
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend"}
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenOtpDrawer(false)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
