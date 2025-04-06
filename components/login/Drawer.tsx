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
import { useRouter } from "next/navigation";
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
import { verifyAuthOtp } from "@/lib/actions/auth/verify-user-login";
import { sendAuthMail } from "@/lib/actions/auth/send-auth-mail";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
interface Props {
  email: string;
  isOpenOtpDrawer: boolean;
  setIsOpenOtpDrawer: (open: boolean) => void;
}
export function OtpDrawer({
  email,
  isOpenOtpDrawer,
  setIsOpenOtpDrawer,
}: Props) {
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const startResendTimer = () => {
    setResendTimer(60);
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

  const handleResendMail = async () => {
    try {
      const res = await sendAuthMail(email);

      if (!res.success) {
        setError(res.message || "Something went wrong");
      }

      startResendTimer();
    } catch (err) {
      console.log(`Error sending resend mail: ${err}`);
      setError((err as Error).message);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setError(null); // clear old error
      const res = await verifyAuthOtp(email, Number(data.pin));
      if (!res.success) {
        setError(res.message);
        return;
      }

      // Close drawer
      setIsOpenOtpDrawer(false);

      // Redirect based on role
      if (res.role === "admin") {
        router.push("/admin/add-item");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(`Error verify otp: ${err}`);
      setError((err as Error).message);
    }
  };
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
                        onClick={handleResendMail}
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
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
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
