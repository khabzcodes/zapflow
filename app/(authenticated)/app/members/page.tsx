'use client';
import { QUERY_KEYS } from '@/rpc/keys';
import { getOrganizationMembers } from '@/rpc/members';
import { useQuery } from '@tanstack/react-query';

const MembersPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZATION_MEMBERS],
    queryFn: async () => getOrganizationMembers(),
  });

  if (!isPending && error) {
    return;
  }

  return (
    <div>
      {data?.map((member) => (
        <div key={member.id}>{member.user.name}</div>
      ))}
    </div>
  );
};

export default MembersPage;
