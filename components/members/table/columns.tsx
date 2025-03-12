import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { MemberWithUserAndOrganization } from '@/types/member';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<MemberWithUserAndOrganization>[] = [
  {
    accessorKey: 'user.name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      const name = row.original.user.name;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: 'user.email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => {
      const email = row.original.user.email;
      return <span className="font-medium">{email}</span>;
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      return <span className="font-medium capitalize">{role}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Joined At"
      />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <span className="font-medium capitalize">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
];
