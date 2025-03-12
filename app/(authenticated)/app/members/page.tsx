'use client';
import { columns } from '@/components/members/table/columns';
import { DataTable } from '@/components/ui/data-table';
import { QUERY_KEYS } from '@/rpc/keys';
import { getOrganizationMembers } from '@/rpc/members';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MembersPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZATION_MEMBERS],
    queryFn: async () => getOrganizationMembers(),
  });

  if (!isPending && error) {
    return;
  }

  const formattedData =
    data?.map((member) => ({
      ...member,
      createdAt: new Date(member.createdAt),
      user: {
        ...member.user,
        createdAt: new Date(member.user.createdAt),
        updatedAt: new Date(member.user.updatedAt),
      },
      organization: {
        ...member.organization,
        createdAt: new Date(member.organization.createdAt),
      },
    })) || [];

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={formattedData}
          searchQuery=""
        />
      )}
    </div>
  );
};

export default MembersPage;
