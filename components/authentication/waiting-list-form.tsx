'use client';
import { cn } from '@/lib/utils';
import {
  heardAboutUsOptions,
  WaitingListFormData,
  waitingListSchema,
} from '@/validations/waiting-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentPropsWithRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Logo } from '../shared/logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

type WaitingListFormProps = ComponentPropsWithRef<'div'>;

export const WaitingListForm = ({ className }: WaitingListFormProps) => {
  const form = useForm<WaitingListFormData>({
    resolver: zodResolver(waitingListSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: WaitingListFormData) => {
    console.table(data);
  };
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-2">
        <Logo />
        <h1 className="text-2xl font-bold">Join waiting list</h1>
        <p className="text-muted-foreground text-md">
          Be the first to know when we launch. Join our waiting list and get
          exclusive updates, early access, and special offers.
        </p>
      </div>
      <Form {...form}>
        <form
          className="grid gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage
                  {...form}
                  className="text-destructive text-xs"
                />
              </FormItem>
            )}
          />
          <FormField
            name="organization"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Organization/Business name
                  <span className="text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage
                  {...form}
                  className="text-destructive text-xs"
                />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage
                  {...form}
                  className="text-destructive text-xs"
                />
              </FormItem>
            )}
          />
          <FormField
            name="heardFromUs"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you hear about us?</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="How did you hear about us?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {heardAboutUsOptions.map((option) => (
                      <SelectItem
                        className="capitalize"
                        value={option}
                        key={option}>
                        {option.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage
                  {...form}
                  className="text-destructive text-xs"
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
