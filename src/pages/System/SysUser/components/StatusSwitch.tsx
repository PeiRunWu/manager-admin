import { updateSysUserStatus } from '@/services/system/sysUserService';
import { Switch } from 'antd';
import React, { useState } from 'react';

interface Props {
  id: string;
  status: number;
}

const StatusSwitch: React.FC<Props> = React.memo(({ id, status }) => {
  const [checked, setChecked] = useState(status === 1);

  const handleStatusChange = async (id: string, checked: boolean) => {
    setChecked(checked);
    await updateSysUserStatus(id, checked ? 1 : 0);
  };

  return (
    <Switch checked={checked} onChange={(checked: boolean) => handleStatusChange(id, checked)} />
  );
});

export default StatusSwitch;
