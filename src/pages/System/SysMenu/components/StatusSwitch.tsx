import { SysMenuType } from '@/repository/system/SysMenu';
import { updateSysMenuHidden } from '@/services/system/sysMenuService';
import { Switch } from 'antd';
import React, { useState } from 'react';

interface Props {
  record: SysMenuType.SysMenuVO;
}

const StatusSwitch: React.FC<Props> = React.memo(({ record }) => {
  const [checked, setChecked] = useState(record.hidden === 1);

  const handleStatusChange = async (id: string, checked: boolean) => {
    setChecked(checked);
    await updateSysMenuHidden(id, checked ? 1 : 0);
  };

  return (
    <Switch
      checked={checked}
      onChange={(checked: boolean) => handleStatusChange(record.id, checked)}
    />
  );
});

export default StatusSwitch;
