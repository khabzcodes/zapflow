import { WaitingListFormData } from '@/validations/waiting-list';
import { baseApiRoute } from './config';

const route = baseApiRoute.public.waitingList;

export const addToWaitingList = async (data: WaitingListFormData) => {
  const response = await route.$post({ json: data });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { waitlistRecord } = await response.json();
  return waitlistRecord;
};
