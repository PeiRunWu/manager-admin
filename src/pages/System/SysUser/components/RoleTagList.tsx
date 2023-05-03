import { Tag } from 'antd';
import React, { FC } from 'react';

interface Props {
  roleNameList: any;
}

const RoleTagList: FC<Props> = React.memo(({ roleNameList }) => {
  return (
    <>
      {roleNameList.map((role:any) => (
        <Tag key={role} color="green">
          {role}
        </Tag>
      ))}
    </>
  );
});

export default RoleTagList;
