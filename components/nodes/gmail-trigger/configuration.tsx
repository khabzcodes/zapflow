import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

export const GmailTriggerConfiguration = () => {
  return (
    <div className="flex flex-col gap-3 justify-start relative p-4 bg-secondary w-full">
      <Button size="sm">
        <Image
          src="/connections/gmail.png"
          width={13}
          height={13}
          alt="Gmail"
        />
        Create a connection
      </Button>
      <div className="flex flex-col gap-1">
        <Label className="text-xs">
          Filter type <span className="text-red-500">*</span>{' '}
        </Label>
        <Select>
          <SelectTrigger className="w-full text-xs border-1 border-muted-foreground">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="simple-filer">Simple filter</SelectItem>
            <SelectItem value="gmail-filer">Gmail filter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-xs">
          Criteria <span className="text-red-500">*</span>{' '}
        </Label>
        <Select>
          <SelectTrigger className="w-full text-xs border-1 border-muted-foreground">
            <SelectValue placeholder="Select a criteria" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="all-emails">All emails</SelectItem>
            <SelectItem value="only-read-emails">Only read emails</SelectItem>
            <SelectItem value="only-unread-emails">
              Only unread emails
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
