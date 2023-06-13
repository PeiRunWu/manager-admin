import { BlogArticleType } from '@/repository/blog/BlogArticle';
import { updateBlogArticleTop } from '@/services/blog/BlogArticleService';
import { Switch } from 'antd';
import { useState } from 'react';

interface Props {
  record: BlogArticleType.BlogArticle;
  handleFetchList: () => void;
}

const StatusSwitch: React.FC<Props> = ({ record, handleFetchList }) => {
  const [checked, setChecked] = useState(record.top === 1);

  const handleStatusChange = async (id: string, checked: boolean) => {
    setChecked(checked);
    const data = {
      id: id,
      top: checked ? 1 : 0,
    };
    await updateBlogArticleTop(data);
    handleFetchList();
  };

  return (
    <Switch
      checked={checked}
      onChange={(checked: boolean) => handleStatusChange(record.id, checked)}
    />
  );
};
export default StatusSwitch;
