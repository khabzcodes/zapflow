'use client';
import { WaitingListForm } from '@/components/authentication';
import { addToWaitingList } from '@/rpc/waiting-list';
import { WaitingListFormData } from '@/validations/waiting-list';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const WaitingListPage = () => {
  const mutation = useMutation({
    mutationFn: async (data: WaitingListFormData) =>
      await addToWaitingList(data),
    onSuccess: () => {
      toast.success("You're on the list! 🎉");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: WaitingListFormData) => {
    await mutation.mutateAsync(data);
  };
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <WaitingListForm
          handleFormSubmit={(data) => handleSubmit(data)}
          isLoading={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default WaitingListPage;
