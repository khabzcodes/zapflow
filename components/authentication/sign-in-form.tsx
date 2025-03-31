'use client';
import { cn } from '@/lib/utils';
import { SignInFormInput, signInSchema } from '@/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signIn } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';

type SignInFormProps = React.ComponentPropsWithRef<'div'>;

export const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const [githubSignInLoading, setGithubSignInLoading] = React.useState(false);

  const form = useForm<SignInFormInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const githubSignIn = async () => {
    setGithubSignInLoading(true);
    const response = await signIn.social({
      provider: 'github',
    });

    if (response.error) {
      setGithubSignInLoading(false);
      return;
    }

    redirect('/app');
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="text-muted-foreground text-md">
          Automate Workflows, Simplify Tasks with less effort.
        </p>
      </div>
      <Form {...form}>
        <form className="grid gap-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                  />
                </FormControl>
                <FormMessage
                  {...field}
                  className="text-destructive text-xs"
                />
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button variant="outline">
        <Icons.google className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
      <Button
        disabled={githubSignInLoading}
        variant="outline"
        onClick={githubSignIn}>
        {githubSignInLoading ? (
          <Icons.spinner className="w-6 h-6 mr-2 animate-spin" />
        ) : (
          <>
            <Icons.github className="w-6 h-6 mr-2" />
            Continue with Github
          </>
        )}
      </Button>
    </div>
  );
};
