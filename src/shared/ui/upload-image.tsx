'use client';

import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { RoundedButton } from '@/shared/ui/buttons';

type UploadImageProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export const UploadImage = ({
  disabled,
  onChange,
  onRemove,
  value,
}: UploadImageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event !== 'success' ||
      !result.info ||
      typeof result.info === 'string'
    )
      return;

    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div className='mb-4 flex flex-col items-start gap-4'>
      <div className='flex gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <RoundedButton
                type='button'
                size='icon'
                variant='destructive'
                onClick={() => onRemove(url)}>
                <Trash className='h-4 w-4' color='#fff' />
              </RoundedButton>
            </div>
            <Image fill className='object-cover' src={url} alt='Image' />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset='duqla6y4'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <RoundedButton
              type='button'
              disabled={disabled}
              onClick={onClick}
              onMouseLeave={() => setBtnHovered(false)}
              onMouseEnter={() => setBtnHovered(true)}>
              <ImagePlus
                className='w-4 h-4 mr-2'
                color={btnHovered ? '#000' : '#fff'}
              />
              Upload an image
            </RoundedButton>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

// useEffect(() => {
//   void (async () => {
//     try {
//       const usersData = await fetchUsers();
//       setUsers(usersData);
//
//       const rolesPromises = usersData.map(user =>
//         fetchUserRoles(user.id).then(roles => ({
//           userId: user.id,
//           roles
//         }))
//       );
//
//       const rolesData = await Promise.all(rolesPromises);
//       const rolesMap = rolesData.reduce((acc, {userId, roles}) => {
//         acc[userId] = roles;
//         return acc;
//       }, {} as Record<string, Role[]>);
//
//       setUserRoles(rolesMap);
//       console.log(rolesMap[usersData[0].id])
//     } catch (err) {
//       setError("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   })();
// }, []);
