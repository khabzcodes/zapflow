// 'use client';
// import { Connection } from '@/types/connection';
// import Image from 'next/image';
// import { Badge } from '../ui/badge';
// import { redirect } from 'next/navigation';

// type ConnectionCardProps = {
//   connection: Connection;
//   connected: boolean;
// };

// export const ConnectionCard = ({
//   connection,
//   connected,
// }: ConnectionCardProps) => {
//   const handleOnClick = () => {
//     redirect(`/app/integrations/${connection.name}`);
//   };

//   return (
//     <div
//       className="border p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-white transition-colors duration-200 cursor-pointer"
//       onClick={handleOnClick}>
//       <div className="flex items-center gap-4 mb-4 md:mb-0">
//         <div className="w-12 h-12 relative">
//           <Image
//             src={connection.icon || '/placeholder.svg'}
//             alt={connection.name}
//             width={48}
//             height={48}
//             className="object-contain"
//           />
//         </div>
//         <div>
//           <h3 className="font-medium text-base">{connection.displayName}</h3>
//           <p className="text-xs text-muted-foreground flex items-center gap-1">
//             {!connected ? (
//               <>
//                 <span className="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
//                 Not Installed
//               </>
//             ) : (
//               <>
//                 <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
//                 Installed
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {connection.categories.map((category) => (
//           <Badge
//             key={`${connection.name}-${category}`}
//             variant="secondary"
//             className="rounded-md font-normal">
//             {category}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// };
