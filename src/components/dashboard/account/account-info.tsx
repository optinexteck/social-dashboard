'use client';

import * as React from 'react';
import { UserContext } from '@/contexts/user-context'; // Import the UserContext
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function AccountInfo(): React.JSX.Element {
  const { user, isLoading, error } = React.useContext(UserContext); // Use context to get user details

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={user?.avatar || '/assets/avatar.png'} sx={{ height: '80px', width: '80px' }} />
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user?.name || 'Unknown User'}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email || 'No email provided'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Update Profile
        </Button>
      </CardActions>
    </Card>
  );
}
